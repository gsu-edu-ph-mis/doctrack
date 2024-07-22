/**
 * Permission checks are hardcoded in route middlewares.
 * Code should be updated together with this list.
 */

//// Core modules

//// External modules

//// Modules

const OWN_ACCOUNT = [
    // Own account related - admin users
    'read_own_account',
    'update_own_password',
]

const ADMIN_ACAD = [
    'read_all_curriculum',
    'create_curriculum',
    'read_curriculum',
    'update_curriculum',
    'delete_curriculum',

    'read_all_course',
    'create_course',
    'read_course',
    'update_course',
    'delete_course',

    'read_all_teacher',
    'create_teacher',
    'read_teacher',
    'update_teacher',
    'delete_teacher',


    'read_all_student',
    'create_student',
    'read_student',
    'update_student',
    'delete_student',


    'read_all_grade',
    'create_grade',
    'read_grade',
    'update_grade',
    'delete_grade',

    'read_all_schedule',
    'create_schedule',
    'read_schedule',
    'update_schedule',
    'delete_schedule',

    'read_all_registrationForm',
    'create_registrationForm',
    'read_registrationForm',
    'update_registrationForm',
    'delete_registrationForm',

    
    'read_all_room',
    'create_room',
    'read_room',
    'update_room',
    'delete_room',

    
    'read_all_instructor',
    'create_instructor',
    'read_instructor',
    'update_instructor',
    'delete_instructor',


    'read_all_college',
    'create_college',
    'read_college',
    'update_college',
    'delete_college',


    'read_all_section',
    'create_section',
    'read_section',
    'update_section',
    'delete_section',
]

const SYS_ADMIN = [

    'read_all_permission',
    'create_permission',
    'read_permission',
    'update_permission',
    'delete_permission',

    'read_all_role',
    'create_role',
    'read_role',
    'update_role',
    'delete_role',

    'read_all_user',
    'create_user',
    'read_user',
    'update_user',
    'delete_user',
]

const ALL = [...ADMIN_ACAD, ...SYS_ADMIN, ...OWN_ACCOUNT]

module.exports = {
    ADMIN_ACAD: ADMIN_ACAD,
    SYS_ADMIN: SYS_ADMIN,
    ALL: ALL,
}