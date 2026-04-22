from pydantic import BaseModel

class EducationResponse(BaseModel):
  education_id:int
  education_name:str

  class Config:
      from_attributes = True
