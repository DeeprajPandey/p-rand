FROM alpine:3.11.5

RUN apk add --update py2-pip

COPY api.py /usr/src/app/
COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt

EXPOSE 6401

CMD ["python", "/usr/src/app/api.py"]