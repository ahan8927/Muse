from .db import db


class Likes(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    beat_id = db.Column(db.Boolean, db.ForeignKey('beats.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='likes')
    beat = db.relationship('Beat', back_populates='likes')
