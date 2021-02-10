from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import desc
from app.models import User, Board, Pad, db

board_routes = Blueprint('board', __name__)


@board_routes.route('/<int:userId>/<int:boardId>')  # GET specific board
def specific_board(userId, boardId):
    board = Board.query.get(boardId)
    board = board.to_dict()

    board_pads = Pad.query.filter_by(board_id=board.id).all()
    board_pads = [pad.to_dict() for pad in board_pads]

    board_state = {}

    board_state['projectName'] = board.title
    board_state['bpm'] = board.bpm

    board_state['sequences'] = {}
    for i in range(16):
        current_pad = board_pads[i]
        sequence = {}
        sequenceData = {}

        sequence['sequenceTitle'] = current_pad.title
        sequence['color'] = current_pad.color
        sequence['multiplier'] = current_pad.multiplier

        sequenceData['columnOrder'] = [
            f'block-{(current_pad.block_list[index] if current_pad.block_list[index] != None else index) + 1}' for index in range(len(current_pad.block_list))]

        sequenceData['columns'] = {}
        sequenceData['tasks'] = {}

        temp_block = []
        temp_notes = []

        for note_index in range(len(current_pad.note_seq)):
            current_note_id = current_pad.note_seq[note_index]

            if current_note_id == None:
                temp_block.append(temp_notes)
                temp_notes = []
                continue

            temp_note_id = f'{current_note_id}-{note_index + 1}'
            temp_notes.append(temp_note_id)

            sequenceData['tasks'][temp_note_id] = {
                'id': temp_note_id,
                'title': current_note_id.split('-')[1],
                'library': current_note_id.split('-')[0],
            }

        for column_index in range(len(sequenceData['columnOrder'])):
            current_block_id = sequenceData['columnOrder'][column_index]

            sequenceData['columns'][current_block_id] = {
                'id': current_block_id,
                'title': current_block_id,
                'taskIds': temp_block[current_pad.block_list[column_index]],
            }

        sequence['sequenceData'] = sequenceData
        board_state['sequences'][i] = sequence

    return {board_state}


@board_routes.route('/<int:userId>')  # GET list of User Boards
def user_boards(userId):
    user_boards = Board.query.filter_by(user_id=userId).all()
    user_boards = [board.to_dict() for board in user_boards]
    return {user_boards}


@board_routes.route('/<int:userId>', methods=['POST'])  # POST a board
@login_required
def handle_board_save(userId):
    sequence_data = request.get_json().get('sequences')
    bpm = request.get_json().get('bpm')
    project_title = request.get_json().get('projectName')

    board = Board(
        title=project_title,
        bpm=bpm,
        user_id=userId,
    )
    db.session.add(board)
    db.session.flush(board)

    for seq_id in sequence_data.sequences.keys():
        current_pad = sequence_data.sequences[seq_id]

        if current_pad.sequence_data == None:
            continue

        # Store basic sequence info
        title = current_pad.sequenceTitle
        color = current_pad.color
        multiplier = current_pad.multiplier
        user_id = userId

        block_list = [int(block_id.split('-')[1]) - 1 if len(
            current_pad.columns[block_id].taskIds) > 0 else None for block_id in current_pad.columnOrder]

        # handle the note sequence
        note_list = []
        for block_id in current_pad.columnOrder:
            current_block = current_pad.columns[block_id]
            if len(current_block.taskIds) > 0:
                for note_id in current_block.taskIds:
                    note = note_id.split('-')
                    note.pop()
                    note_list.append('-'.join(note))
                note_list.append(None)
            else:
                note_list.append(None)

        pad = Pad(
            title=title,
            color=color,
            multiplier=multiplier,

            block_seq=block_list,
            note_seq=note_list,

            user_id=user_id,
            board_id=board.id,
        )
        db.session.add(pad)

    db.session.commit()
