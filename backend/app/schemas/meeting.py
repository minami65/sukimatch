from pydantic import BaseModel

class MeetingResponse(BaseModel):
  meeting_preference_id:int
  meeting_preference_name:str

  class Config:
      from_attributes = True
