import argparse
import logging
import os
import sys
from copy import copy
from typing import IO, List

from cryptography.fernet import Fernet

PREFIX: str = "Fernet;"
DEFAULT_KEY_FILE = "key.key"
logger = logging.getLogger(__name__)


# Available in 3.9 https://docs.python.org/3.9/library/stdtypes.html#str.removeprefix
def removeprefix(text: str, prefix: str) -> str:
    if text.startswith(prefix):
        return text[len(prefix):]
    return text


def _generate_key():
    """
    Generates a key and save it into a file
    """
    key = Fernet.generate_key()
    with open("../../key.key", "wb") as key_file:
        key_file.write(key)


def _write_file(path: str, encrypted: str):
    with open(path, "w") as fd:
        fd.write(encrypted)
    print(f"File {path} written")


def load_key(filename: str = DEFAULT_KEY_FILE) -> bytes:
    try:
        with open(os.path.join(os.getcwd(), filename)) as fd:
            return fd.read().encode()
    except OSError:
        try:
            return os.environ["KEY"].encode()
        except KeyError:
            logger.error("Set env var KEY")
            raise


def encrypt(file: IO[str], key_file: str = DEFAULT_KEY_FILE) -> str:
    content = file.read()
    if PREFIX in content:
        logger.warning("%s already encrypted.", file.name)
        return content

    key = load_key(key_file)
    f = Fernet(key)

    return PREFIX + f.encrypt(content.encode()).decode()


def encrypt_files(files: List[IO[str]], key_file: str = None):
    for file in files:
        encrypted = encrypt(file, key_file)
        _write_file(os.path.realpath(file.name), encrypted)


def decrypt(file: IO[str], key_file: str = DEFAULT_KEY_FILE) -> str:
    content = file.read()
    if PREFIX not in content:
        logger.warning("%s already decrypted.", file.name)
        return content

    key = load_key(key_file)
    f = Fernet(key)

    return f.decrypt(removeprefix(content, PREFIX).encode()).decode()


def decrypt_files(files: List[IO[str]], key_file: str = None):
    for file in files:
        decrypted = decrypt(file, key_file)
        _write_file(os.path.realpath(file.name), decrypted)


def main():
    parser = argparse.ArgumentParser(
        description="Encrypt/decrypt file. Used to include file that should not be open "
                    "sourced (such as licence icons)",
        epilog="""
examples:
    # Generate key
        python -m crypto gen_key
    # Encrypt a file
        python -m crypto encrypt theme/static/images/leaves.svg --key key.key
        KEY=YOLO python -m crypto encrypt theme/static/images/leaves.svg
    # Decrypt file
        python -m crypto decrypt theme/static/images/leaves.svg --key key.key
        KEY=YOLO python -m crypto decrypt theme/static/images/leaves.svg
""",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    subparsers = parser.add_subparsers()

    encrypt_parser = subparsers.add_parser("encrypt", help="encrypt a file")
    encrypt_parser.set_defaults(func=encrypt_files)
    encrypt_parser.add_argument(
        "files", type=argparse.FileType("r"), help="file to encrypt", nargs='+'
    )
    encrypt_parser.add_argument(
        "--key",
        "-k",
        type=str,
        dest="key_file",
        help="key to use. Defaults to 'key.key'",
        required=False,
    )

    decrypt_parser = subparsers.add_parser("decrypt", help="decrypt a file")
    decrypt_parser.set_defaults(func=decrypt_files)
    decrypt_parser.add_argument(
        "files", type=argparse.FileType("r"), help="file to decrypt", nargs='+'
    )
    decrypt_parser.add_argument(
        "--key",
        "-k",
        type=str,
        dest="key_file",
        help="key to use. Defaults to 'key.key'",
        required=False,
    )

    generate_key_parser = subparsers.add_parser("gen_key", help="generate a key")
    generate_key_parser.set_defaults(func=_generate_key)

    if len(sys.argv[1:]) == 0:
        parser.print_help()
        parser.exit()

    args = parser.parse_args()

    _args = copy(vars(args))
    _args.pop("func")
    args.func(**_args)


if __name__ == "__main__":
    main()
