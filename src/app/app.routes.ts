import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { ServicesComponent } from './public/services/services.component';
import { GalleryComponent } from './public/gallery/gallery.component';
import { AppointmentComponent } from './public/appointment/appointment.component';
import { ContactsComponent } from './public/contacts/contacts.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserSettingsComponent } from './user-panel/user-settings/user-settings.component';
import { UserPetsComponent } from './user-panel/user-pets/user-pets.component';
import { UserAppointmentsComponent } from './user-panel/user-appointments/user-appointments.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "services", component: ServicesComponent },
    { path: "gallery", component: GalleryComponent },
    { path: "make-appointment", component: AppointmentComponent },
    { path: "contacts", component: ContactsComponent },
    { path: "auth", redirectTo: "auth/local"},
    { path: "auth/local", component: LoginComponent },
    { path: "auth/local/register", component: RegisterComponent },
    { path: "user/settings", component: UserSettingsComponent, canActivate: [AuthGuard] },
    { path: "user/pets", component: UserPetsComponent, canActivate: [AuthGuard] },
    { path: "user/appointments", component: UserAppointmentsComponent, canActivate: [AuthGuard] },
];
