import argparse
import os
import sys
from copy import copy
from typing import IO

from cryptography.fernet import Fernet

PREFIX: bytes = "Fernet;".encode()


# available in 3.9
def remove_prefix(text: bytes, prefix: bytes):
    if text.startswith(prefix):
        return text[len(prefix):]
    return text


def generate_key():
    """
    Generates a key and save it into a file
    """
    key = Fernet.generate_key()
    with open("key.key", "wb") as key_file:
        key_file.write(key)


def write_file(path: str, encrypted: bytes):
    with open(path, "wb") as fd:
        fd.write(encrypted)
    print(f"File {path} written")


def encrypt(file: IO[bytes], key_file: IO[bytes]):
    if key_file is None:
        try:
            key = os.environ["KEY"]
        except KeyError:
            print("Either set the KEY env variable or pass --key /path/to/key")
            exit(1)
    else:
        key = key_file.read()

    f = Fernet(key)

    content = file.read()
    if PREFIX in content:
        print("File already encrypted. Nothing to do.")
        exit(0)
    encrypted = PREFIX + f.encrypt(content)
    write_file(os.path.realpath(file.name), encrypted)


def decrypt(file: IO[bytes], key_file: IO[bytes]):
    if key_file is None:
        try:
            key = os.environ["KEY"]
        except KeyError:
            print("Either set the KEY env variable or pass --key /path/to/key")
            exit(1)
    else:
        key = key_file.read()

    f = Fernet(key)

    encrypted = file.read()
    if PREFIX not in encrypted:
        print("File already decrypted. Nothing to do.")
        exit(0)
    decrypted = f.decrypt(remove_prefix(encrypted, PREFIX))
    write_file(os.path.realpath(file.name), decrypted)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Encrypt/decrypt file. Used to include file that should not be open "
                                                 "sourced (such as licence icons")
    subparsers = parser.add_subparsers()

    encrypt_parser = subparsers.add_parser('encrypt', help="encrypt a file")
    encrypt_parser.set_defaults(func=encrypt)
    encrypt_parser.add_argument("file", type=argparse.FileType('rb'), help="file to encrypt")
    encrypt_parser.add_argument("--key", "-k", type=argparse.FileType('rb'), dest="key_file", help="key to use",
                                required=False)

    decrypt_parser = subparsers.add_parser('decrypt', help="decrypt a file")
    decrypt_parser.set_defaults(func=decrypt)
    decrypt_parser.add_argument("file", type=argparse.FileType('rb'), help="file to decrypt")
    decrypt_parser.add_argument("--key", "-k", type=argparse.FileType('rb'), dest="key_file", help="key to use",
                                required=False)

    generate_key_parser = subparsers.add_parser('gen_key', help="generate a key")
    generate_key_parser.set_defaults(func=generate_key)

    if len(sys.argv[1:]) == 0:
        parser.print_help()
        parser.exit()

    args = parser.parse_args()

    _args = copy(vars(args))
    _args.pop("func")
    args.func(**_args)
