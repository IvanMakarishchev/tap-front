import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { ServicesComponent } from './public/services/services.component';
import { GalleryComponent } from './public/gallery/gallery.component';
import { BookingComponent } from './public/booking/booking.component';
import { ContactsComponent } from './public/contacts/contacts.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "services", component: ServicesComponent },
    { path: "gallery", component: GalleryComponent },
    { path: "booking", component: BookingComponent },
    { path: "contacts", component: ContactsComponent }
];
