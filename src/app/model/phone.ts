export class Phone {
    id: number;
    name: String;
    attributes: Attributes;
    brand: String;
    points: Points;
    votes: number;
    best: boolean;
}

export class Attributes {
    id: number;
    size: Size;
    weight: number;
    sim_tray: number;
    cpu: String;
    display_size: number;
    card_slot: boolean;
    camera_a: number;
    camera_b: number;
    jack: boolean;
    display_type: String;
    rom: number;
    ram: number;
    resolution: Resolution;
    battery: number;
    sensors: Sensors;
    port: String;
    multitouch: boolean;
}

export class Size {
    id: number;
    length: number;
    width: number;
    height: number;
}

export class Resolution {
    id: number;
    width: number;
    height: number;
}

export class Sensors {
    id: number;
    accelerometer: boolean;
    gyroscope: boolean;
    magnetometer: boolean;
    gps: boolean;
    proximity: boolean;
    light: boolean;
    fingerprint: boolean;
    barometer: boolean;
    thermometer: boolean;
}

export class Points {
    id: number;
    heightPoints: number;
    weightPoints: number;
    simTrayPoints: number;
    cpuPoints: number;
    displaySizePoints: number;
    cardSlotPoints: number;
    cameraAPoints: number;
    cameraBPoints: number;
    jackPoints: number;
    displayTypePoints: number;
    romPoints: number;
    ramPoints: number;
    resolutionPoints: number;
    batteryPoints: number;
    sensorsGyroscopePoints: number;
    sensorsMagnetometerPoints: number;
    sensorsGpsPoints: number;
    sensorsProximityPoints: number;
    sensorsLightPoints: number;
    sensorsFingerprintPoints: number;
    sensorsBarometerPoints: number;
    sensorsThermometerPoints: number;
    sensorsAccelerometerPoints: number;
    portPoints: number;
    multitouchPoints: number;
    totalPoints: number;
}

export class BestPoints {
    heightPoints: boolean;
    weightPoints: boolean;
    simTrayPoints: boolean;
    cpuPoints: boolean;
    displaySizePoints: boolean;
    cardSlotPoints: boolean;
    cameraAPoints: boolean;
    cameraBPoints: boolean;
    jackPoints: boolean;
    displayTypePoints: boolean;
    romPoints: boolean;
    ramPoints: boolean;
    resolutionPoints: boolean;
    batteryPoints: boolean;
    sensorsGyroscopePoints: boolean;
    sensorsMagnetometerPoints: boolean;
    sensorsGpsPoints: boolean;
    sensorsProximityPoints: boolean;
    sensorsLightPoints: boolean;
    sensorsFingerprintPoints: boolean;
    sensorsBarometerPoints: boolean;
    sensorsThermometerPoints: boolean;
    sensorsAccelerometerPoints: boolean;
    portPoints: boolean;
    multitouchPoints: boolean;
    totalPoints: boolean;
}

export class PageableResponse {
    content: Array<Phone>;
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
}

class Pageable {
    sort: Sort;
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

class Sort {
    unsorted: boolean;
    sorted: boolean;
}

export class CustomSearchBody {
    weight: number;
    sim_tray: number;
    minDisplaySize: number;
    maxDisplaySize: number;
    card_slot: boolean;
    cameraA: number;
    cameraB: number;
    jack: boolean;
    display_type: String;
    rom: number;
    ram: number;
    port: String;
    multitouch: boolean;
}
