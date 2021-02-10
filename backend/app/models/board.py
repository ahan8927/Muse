from .db import db
import datetime


class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    bpm = db.Column(db.Integer, default=1000)
    date_created = db.Column(db.Date, default=datetime.datetime.today())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='boards')
    pads = db.relationship('Board', back_populates='pads')
    # likes = db.relationship('Likes', back_populates='beat')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'pad_list': self.pad_list,
            'bpm': self.bpm,
            'date_created': self.date_created,
            'user_id': self.user_id,
        }
