FROM quay.io/ansible/toolset:3.5.0
ENV PACKAGES="\
gettext \
gcc \
libc-dev \
curl \
bash \
openssl \
"
RUN apt-get update && apt-get install -y ${PACKAGES}
RUN pip install openshift junit-xml jmespath docker kubernetes
RUN ansible-galaxy collection install kubernetes.core