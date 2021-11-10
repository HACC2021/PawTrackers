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
class Person {
    constructor(first_name, middle, last_name, dob, pet_relation, military_type, id_num, id_type, id_state, id_exp, addr_line1, addr_line2, city, state, zipcode, hi_line1, hi_line2, hi_city, hi_island, hi_zipcode, phone, alt_phone, country_addr, email, handler_ids, pet_ids, trip_ids) {
        this.person_id = Object.keys(all_persons).length;
        this.first_name = first_name;
        this.middle = middle;
        this.last_name = last_name;
        this.dob = dob;
        this.pet_relation = pet_relation;
        this.military_type = military_type;
        this.id_num = id_num;
        this.id_type = id_type;
        this.id_state = id_state;
        this.id_exp = id_exp;
        this.addr_line1 = addr_line1;
        this.addr_line2 = addr_line2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.hi_line1 = hi_line1;
        this.hi_line2 = hi_line2;
        this.hi_city = hi_city;
        this.hi_island = hi_island;
        this.hi_zipcode = hi_zipcode;
        this.phone = phone;
        this.alt_phone = alt_phone;
        this.country_addr = country_addr;
        this.email = email;
        this.handler_ids = handler_ids;
        this.pet_ids = pet_ids;
        this.trip_ids = trip_ids;
        this.update_time = Date.now();
        this.all_handlers = [];
        this.all_pets = {};
        this.all_trips = {};
    }

    full_name() {
        return `${this.first_name} ${this.middle} ${this.last_name}`;
    }
}

class Pet {
    constructor(pet_name, species, country, dob, breed, sex, sprayed, color, microchip_nums, visitor_ids, document_ids) {
        this.pet_id = Object.keys(all_pets).length;
        this.pet_name = pet_name;
        this.species = species;
        this.country = country;
        this.dob = dob;
        this.breed = breed;
        this.sex = sex;
        this.sprayed = sprayed;
        this.color = color;
        this.microchip_nums = microchip_nums;
        this.update_time = Date.now();
        this.visitor_ids = visitor_ids;
        this.document_ids = document_ids;
        this.visitors = {};
        this.documents = {};
    }
}

class Trip {
    constructor(flight, program, owner_status, covid_status, pet_statuses, handler_ids, trip_documents_ids) {
        this.trip_id = Object.keys(all_trips).length;
        this.flight = flight;
        this.program = program;
        this.owner_status = owner_status;
        this.covid_status = covid_status;
        this.update_time = Date.now();
        this.pet_statuses = pet_statuses
        this.handler_ids = handler_ids
        this.trip_documents_ids = trip_documents_ids

        this.pets = {};
        this.handlers = {};
        this.trip_documents = {};
        this.chat = {};

        const two_hours_ms = 2 * 3600 * 1000;
        this.eta_check_in_time = this.update_time + two_hours_ms;
    }
}

class Document {
    constructor(doc_name, type, sts, link, is_trip, is_pet) {
        this.document_id = Object.keys(all_documents).length;
        this.doc_name = doc_name;
        this.type = type;
        this.sts = sts;
        this.link = link;
        this.is_trip = is_trip;
        this.is_pet = is_pet;
    }
}

class Message {
    constructor() {
        this.msg = msg;
        this.is_user = is_user;
        this.timestamp = timestamp;
    }
}

class Flight {
    constructor(obj) {
        // flight_date, airline, flight_no, departure
        obj && Object.assign(this, obj);
    }
}

class Program {
    constructor(obj) {
        // program_name, program_id, base_price, day_price = 0.0, max_price = 1e9
        obj && Object.assign(this, obj);
    }
}