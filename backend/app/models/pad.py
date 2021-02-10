from .db import db
import datetime


class Pad(db.Model):
    __tablename__ = 'pads'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(64), default='#AFB1D4')
    multiplier = db.Column(db.Integer, default=1000)

    block_seq = db.Column(db.ARRAY(db.String), nullable=False)
    note_seq = db.Column(db.ARRAY(db.String), nullable=False)
    date_created = db.Column(db.Date, default=datetime.datetime.today())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'), nullable=False)

    user = db.relationship('User', back_populates='pads')
    board = db.relationship('Board', back_populates='pads')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'beat_data': self.beat_data,
            'user_id': self.user_id,
            'date_created': self.date_created
        }
