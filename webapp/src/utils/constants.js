export const allowedCols = ['id', 'name', 'email', 'phone', 'status'];

export const headerSize = {
    'id': 'col-1 col-md-1',
    'name': 'col-1 col-md-1',
    'email': 'col-1 col-md-2 col-lg-4 text-truncate',
    'phone': 'col-1 col-md-2 col-lg-2 text-truncate',
    'status': 'col-1 col-md-1',
    'action': 'col-md-1',
}

export const colType = {
    'id': 'hyperlink',
    'name': 'text',
    'email': 'email',
    'phone': 'tel',
    'status': 'enum',
}

export const statusMap = {
    'suspended': 'user-slash',
    'registered': 'users-cog',
    'active': 'user',
}

export class UserModes {
    static get CREATE () {
        return "CREATE";
    }

    static get READ () {
        return "READ";
    }

    static get UPDATE () {
        return "UPDATE";
    }
}
