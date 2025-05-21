import { EndPoints } from "./endpoints";

export enum Nav {
    Home = '',
    About = '/about',
    Services = '/services',
    Gallery = '/gallery',
    "Make Appointment" = '/make-appointment',
    Contacts = '/contacts'
}

export enum NavAuth {
    LogIn = '/auth/local',
    Register = '/auth/local/register'
}

export enum NavUser {
    "My Appointments" = '/user/appointments',
    "My Pets" = '/user/pets',
    Settings = '/user/settings'
}