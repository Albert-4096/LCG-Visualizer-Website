from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import io

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LCGParameters(BaseModel):
    a: int
    c: int
    m: int
    size: int = 256  # Resolution width/height

@app.get("/generate")
def generate_image(a: int, c: int, m: int, size: int = 256):
    try:
        if size > 1024:
             raise HTTPException(status_code=400, detail="Size too large. Max 1024.")
             
        # LCG Generation Logic
        # x starts at 1
        x = 1
        length = size * size
        
        # Create a byte array for the image data
        # Mode 'L' takes 8-bit pixels, black and white
        pixels = bytearray(length)
        
        for i in range(length):
            x = (a * x + c) % m
            # Normalize to 0-255
            # x / m is [0, 1)
            # int((x / m) * 255) maps it to byte range
            val = int((x / m) * 255)
            pixels[i] = val
            
        # Create Image from bytes
        img = Image.frombytes('L', (size, size), bytes(pixels))
        
        # Save to buffer
        buf = io.BytesIO()
        img.save(buf, format='PNG')
        buf.seek(0)
        
        return Response(content=buf.getvalue(), media_type="image/png")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok"}
