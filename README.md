# blog.mlcdf.fr [![Netlify Status](https://api.netlify.com/api/v1/badges/a1b831c3-bef6-4136-ab23-b328ef34e956/deploy-status)](https://app.netlify.com/sites/lucid-chandrasekhar-6bec95/deploys)

My personal website

## Install

```bash
python -V # should print 3.6+
python -m venv venv
source venv/bin/activate # on Windows : venv\Scripts\activate.bat
python -m pip install -r requirements.txt
```

## Scripts

Start dev server on port 8000
```bash
./script/dev.sh
```

Build website
```bash
./script/build.sh
```

Build website for production
```bash
./script/publish.sh
```
