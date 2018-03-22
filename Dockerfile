FROM scratch
COPY mlcdf /mlcdf
COPY templates /templates
COPY static /static
EXPOSE 3000
ENTRYPOINT ["/mlcdf"]
