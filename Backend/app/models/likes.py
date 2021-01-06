from .db import db


class Likes(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    beat_id = db.Column(db.Boolean, db.ForeignKey('users.id'), default=False)
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
