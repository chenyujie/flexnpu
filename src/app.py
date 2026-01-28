from typing import List, Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FlexNPU API", version="1.0.0")

# 配置 CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有 HTTP 方法
    allow_headers=["*"],  # 允许所有请求头
)


@app.get("/api/v1/status")
async def get_status() -> Dict[str, List[Dict[str, float]]]:
    """
    获取 NPU 状态信息
    """
    return {
        "data": [
            {"mem": 0.45, "npu": 0.35},
            {"mem": 0., "npu": 0.15},
            {"mem": 0., "npu": 0.25},
            {"mem": 0., "npu": 0.35},
            {"mem": 0.9, "npu": 0.75},
            {"mem": 0.5, "npu": 0.35},
            {"mem": 0.5, "npu": 0.35},
            {"mem": 0.5, "npu": 0.35},
        ]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8090)
