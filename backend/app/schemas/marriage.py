from pydantic import BaseModel

class MarriageResponse(BaseModel):
  marriage_intention_id:int
  marriage_intention_name:str

  class Config:
      from_attributes = True
