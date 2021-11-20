pet_statuses = {
    INCOMING: "Incoming",
    IN_TRANSIT: "In Transit",
    PRESENT: "Present",
    PICKED_UP: "Picked Up"
};

person_statuses = {
    INCOMING: "Incoming",
    WAITING: "Waiting",
    CHECKED_IN: "Checked in",
    COMPLETED: "Completed"
};

document_statuses = {
    NOT_RECEIVED: "Not Received",
    RECEIVED: "Received",
    VERIFIED: "Verified",
    REJECTED: "Rejected",
    EXPIRED: "Expired"
};

covid_statuses = {
    INCOMPLETE: "Incomplete",
    VACCINATED: "Vaccinated",
    TESTED: "Tested",
    NON_COMPLIANT: "Non-Compliant"
};

pet_relations = {
    PRIMARY_OWNER: "Primary Owner",
    CO_OWNER: "Co-Owner",
    THIRD_PARTY_HANDLER: "Third Party Handler"
};

military_types = {
    CIVILIAN: "Civilian",
    ARMY: "Army",
    NAVY: "Navy",
    MARINES: "Marines",
    COAST_GUARD: "Coast Guard",
    AIR_FORCE: "Air Force",
    OTHER: "Other"
}

id_types = {
    PASSPORT: "Passport",
    DRIVERS_LICENSE: "Drivers License",
    COMPANY_CARD: "Company Card",
    NATIVE_TRIBAL_CARD: "Native Tribal Card",
    OTHER: "Other"
}

hi_islands = {
    HAWAII: "Hawaii",
    MAUI: "Maui",
    OAHU: "Oahu",
    KAUAI: "Kauai"
}

species = {
    DOG: "Dog",
    CAT: "Cat"
}

programs = {
    DIRECT_AIRPORT_RELEASE: "Direct Airport Release",
    FIVE_DAY: "5 Day or Less",
    EARLY: "Early",
    NIIP_DAR: "Neighbor Island Inspection Permit",
    SUBSEQUENT_ENTRY: "Subsequent Entry",
    ONE_HUNDRED_TWENTY_DAY: "120 Day Quarantine",
    TRANSIT: "Transit"
}

doc_types = {
    PET_IMPORT_FORM: "Pet Import Form",
    PRIOR_RABIES: "Prior Rabies Vaccine Certificate",
    CURRENT_RABIES: "Current Rabies Vaccine Certificate",
    HEALTH_CERT: "Health Certificate",
    HI_HEALTH_CERT: "Health Certificate Issued in Hawaii (for HI pets returning)"
}
class Person {
    constructor(obj, all_handlers = {}, all_pets = {}, all_trips = {}) {
        // person_id, first_name, middle_initial, last_name, dob, pet_relation, military_type, id_num, id_type, id_state, id_exp, addr_line1, addr_line2, city, state, zipcode, hi_line1, hi_line2, hi_city, hi_island, hi_zipcode, phone, alt_phone, country_addr, email, handler_ids, pet_ids, trip_ids, update_time
        obj && Object.assign(this, obj);
        this.all_handlers = all_handlers;
        this.all_pets = all_pets;
        this.all_trips = all_trips;
        // console.log("Person Trips:", this)
    }

    full_name() {
        return `${this.first_name} ${this.middle_initial} ${this.last_name}`;
    }
}

class Pet {
    constructor(obj, visitors = {}, pet_documents = {}) {
        //pet_id, pet_name, species, country, dob, breed, sex, spayed_neutered, color, microchip_nums, visitor_ids, document_ids, update_time
        obj && Object.assign(this, obj);
        if (!this.visitors) this.visitors = visitors;
        if (!this.pet_documents) this.pet_documents = pet_documents;
    }
}

class Trip {
    constructor(obj, trip_pets = {}, trip_documents = {}, chat = {}, pet_ids = [], pets = {}) {
        // trip_id, flight, program, covid_status, pet_statuses, handler_ids, trip_documents_ids, update_time, eta_check_in_time
        obj && Object.assign(this, obj);
        if (!this.trip_pets) this.trip_pets = trip_pets;
        if (!this.trip_documents) this.trip_documents = trip_documents;
        if (!this.chat) this.chat = chat;
        if (!this.pet_ids) this.pet_ids = pet_ids;
        if (!this.pets) this.pets = pets;
    }
}

class Trip_Pet {
    constructor(obj) { //need trip_id to connect trip to trip pet
        // trip_id, pet_id, handler_id, pet_status, handler_status
        obj && Object.assign(this, obj);
    }
}

class Document {
    constructor(obj) {
        // doc_name, doc_type, doc_status, link, is_trip, is_pet, submission_time, exp_time
        obj && Object.assign(this, obj);
    }
}

class Message {
    constructor(obj) {
        // message_id, msg, is_user, timestamp, trip_id
        obj && Object.assign(this, obj);
    }
}

class Flight {
    constructor(obj) {
        //airline, flight_id, departure, arrival_destination, arrival_time
        obj && Object.assign(this, obj);
    }

    time_until_arrival() {
        const arrival_timestamp = new Date(`${this.flight_date} ${this.arrival_time}`)
        return time_since(arrival_timestamp)
    }
}

class Program {
    constructor(obj) {
        // program_name, program_id, base_price, day_price = 0.0, max_price = 1e9
        obj && Object.assign(this, obj);
    }
}