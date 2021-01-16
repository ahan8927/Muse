from flask import Blueprint, jsonify
from app.models import User, Beat
from sqlalchemy import desc

beat_routes = Blueprint('beats', __name__)


@beat_routes.route('/')  # get top 10 beats
def beats():
    beats = Beat.query.order_by(
        desc(Beat.id)).limit(10).all()
    return {"beats": [beat.to_dict() for beat in beats]}


@beat_routes.route('/<int:id>')  # get specific beat
def beat(id):
    beat = Beat.query.get(id)
    return beat.to_dict()
