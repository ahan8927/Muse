from flask import Blueprint, jsonify, request
from sqlalchemy import desc
from app.models import User, Board, Pad, db

beat_routes = Blueprint('board', __name__)


# @beat_routes.route('/')  # get top 10 beats
# def beats():
#     beats = Beat.query.order_by(
#         desc(Beat.id)).limit(10).all()
#     return {"beats": [beat.to_dict() for beat in beats]}

@board_routes.route('/<int:userId>')
def get_specific_board():
    # list of pad objects for bulk insert
    Pads = []

    for seq_id in data.sequences.keys():
        temp = {}
        current_pad = data.sequences[seq_id]

        # Store basic sequence info
        temp['title'] = current_pad.sequenceTitle
        temp['color'] = current_pad.color
        temp['multiplier'] = current_pad.multiplier
        temp['user_id'] = userId
        temp['board_id'] =
        temp['block_list'] = [block_id for block_id in current_pad.columnOrder if len(current_pad.columns[block_id].taskIds) > 0 else None]

        # handle the note sequence
        for block_id in current_pad.columnOrder:
            current_block = current_pad.columns[block_id]
            if
            for note_id in current_block.taskIds:
                temp['note_seq'].append(note_id)
            temp['note_seq'].append(None)

        Pads.append(temp)

    for pad in Pads:
        db.session.flush(pad)

    Boards = {
        title: data.projectName,
        user_id: userId,
        bpm: data.bpm,
        pad_list: [seq_id for seq_id in data.sequences.keys()]
    }


@board_routes.route('/<int:userId>', methods=['POST'])
def handle_board_save(int):
