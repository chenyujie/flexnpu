FROM node:20 AS builder
COPY web web
RUN --mount=type=cache,id=flexnpu_npm,target=/root/.npm,sharing=locked \
    cd web && npm install && npm run build

# Python build stage - using uv for faster package installation
FROM ghcr.io/astral-sh/uv:python3.11-bookworm-slim AS base
ARG APP_HOME=/root/git/huawei/flexnpu
USER root

ENV DEBIAN_FRONTEND=noninteractive
ENV UV_SYSTEM_PYTHON=1
ENV UV_COMPILE_BYTECODE=1
ENV UV_INDEX_URL=https://mirrors.aliyun.com/pypi/simple
ENV UV_HTTP_TIMEOUT=300
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR ${APP_HOME}

# Copy project metadata and sources
COPY pyproject.toml .
COPY README.md .
COPY src src

COPY nginx nginx
COPY --from=builder web/dist web/dist

# Ensure shared data directory exists for uv caches
RUN mkdir -p /root/.local/share/uv && \
    sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources && \
    apt update && apt install -y nginx

# Install base, API, and offline extras without the project to improve caching
RUN --mount=type=cache,id=flexnpu_uv,target=/root/.local/share/uv,sharing=locked \
    uv sync

ENV PATH="${APP_HOME}/.venv/bin:${PATH}"
ENV PYTHONPATH=${APP_HOME}/src

RUN chmod +x ./nginx/entrypoint*.sh

ENTRYPOINT ["./nginx/entrypoint.sh"]
