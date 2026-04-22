from pydantic import BaseModel

class LivingResponse(BaseModel):
  living_arrangement_id:int
  living_arrangement_name:str

  class Config:
      from_attributes = True
