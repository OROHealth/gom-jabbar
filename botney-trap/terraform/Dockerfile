FROM python:3.7-slim
# RUN pip3 install mypy-lang==0.4 flake8==2.5.4 pyyaml

# hadolint ignore=DL3018
RUN apt-get update \
  && apt-get install -y curl unzip make \
  && apt-get clean

RUN curl -sL "https://releases.hashicorp.com/terraform/1.0.0/terraform_1.0.0_linux_amd64.zip"> terraform.zip \
  && unzip terraform.zip \
  && mv terraform /usr/local/bin

RUN curl -sL -o /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.1.3/dumb-init_1.1.3_amd64 && chmod +x /usr/local/bin/dumb-init


COPY . /src
WORKDIR /src

ENTRYPOINT ["/usr/local/bin/dumb-init"]

# RUN cd /src && make install