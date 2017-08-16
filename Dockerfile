FROM scratch
MAINTAINER Maxime Le Conte des Floris <hello@mlcdf.com>
COPY mlcdf /mlcdf
COPY public /public
EXPOSE 5000
ENTRYPOINT ["/mlcdf"]
