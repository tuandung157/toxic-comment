FROM ubuntu:20.04

RUN apt-get update

RUN apt-get install -y python3.8 python3-pip
RUN python3 -m pip install --upgrade pip
RUN apt-get -y update
RUN pip install nltk

RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/requirements.txt
RUN pip3 install -r requirements.txt

RUN pip3 install flask-cors