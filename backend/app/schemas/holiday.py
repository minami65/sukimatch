from pydantic import BaseModel

class HolidayResponse(BaseModel):
  holiday_id:int
  holiday_name:str

  class Config:
      from_attributes = True
