# FlexNPU API Service

使用 FastAPI 和 uv 构建的 NPU 状态监控 API 服务。

## 使用 uv 管理项目

### 初始化项目

```bash
# 安装依赖
uv sync
```

### 运行服务

```bash
# 使用 uv run 运行
uv run python src/app.py

# 或使用 uvicorn
uv run uvicorn src.app:app --host 0.0.0.0 --port 8090 --reload
```

### 添加依赖

```bash
# 添加新依赖
uv add <package-name>

# 添加开发依赖
uv add --dev <package-name>
```

### 其他常用命令

```bash
# 更新依赖
uv lock --upgrade

# 删除依赖
uv remove <package-name>

# 查看依赖树
uv tree

# 运行测试
uv run pytest
```

## API 端点

### GET /api/v1/status

获取 NPU 状态信息。

**响应示例：**

```json
{
  "data": [
    {"mem": 0.5, "npu": 0.35},
    {"mem": 0.5, "npu": 0.35},
    {"mem": 0.5, "npu": 0.35},
    {"mem": 0.5, "npu": 0.35},
    {"mem": 0.5, "npu": 0.35},
    {"mem": 0.5, "npu": 0.35},
    {"mem": 0.5, "npu": 0.35},
    {"mem": 0.5, "npu": 0.35}
  ]
}
```
