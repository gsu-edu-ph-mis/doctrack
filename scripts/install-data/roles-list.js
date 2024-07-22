/**
 * Roles are a group of permissions.
 */

//// Core modules

//// External modules

//// Modules
const { ALL, ADMIN_ACAD, SYS_ADMIN } = require('./permissions-list');

const ROLES = [
    {
        key: 'sysadmin',
        name: 'System Admin',
        description: 'Can do anything.',
        permissions: ALL
    },
    {
        key: 'adminacad',
        name: 'Admin Academics',
        description: 'Can do mostly everything related to student & teacher administration except system administration.',
        permissions: ADMIN_ACAD
    },
    {
        key: 'dean',
        name: 'College Dean',
        description: 'Can do mostly everything related to student & teacher administration of own college.',
        permissions: ADMIN_ACAD
    },
    {
        key: 'registrar',
        name: 'Registrar',
        description: 'Can do mostly everything related to student administration.',
        permissions: ADMIN_ACAD
    },
    {
        key: 'teacher',
        name: 'Admin Academics',
        description: 'Can encode and read grades only.',
        permissions: [
            'create_grade',
            'read_grade',
        ]
    },
    {
        key: 'student',
        name: 'Student',
        description: 'Can read grade only.',
        permissions: [
            'read_grade'
        ]
    },
]

module.exports = ROLES