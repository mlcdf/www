FROM scratch
COPY mlcdf /mlcdf
COPY public /public
EXPOSE 5000
ENTRYPOINT ["/mlcdf"]
