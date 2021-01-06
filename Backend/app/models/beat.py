from .db import db
import datetime


class Beat(db.Model):
    __tablename__ = 'beats'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    beat_data = db.Column(db.ARRAY(db.Integer))
    date_created = db.Column(db.Date, default=datetime.datetime.today())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='routes',
                           primaryjoin='User.id==Route.user_creator')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'beat_data': self.beat_data,
            'user_id': self.user_id,
            'date_created': self.date_created
        }
