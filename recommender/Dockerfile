FROM python:3.11.6

ADD . /flask_server
WORKDIR /flask_server

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

CMD [ "flask", "run" ]