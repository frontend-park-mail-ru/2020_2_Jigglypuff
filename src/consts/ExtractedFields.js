const ExtractedFields = {
    CinemaData: new Set([
        'Address',
        'AuthorID',
        'HallCount',
        'ID',
        'Name',
        'PathToAvatar',
    ]),
    HallData: new Set([
        'id',
        'placeAmount',
        'placeConfig',
    ]),
    MovieData: new Set([
        'ActorList',
        'AgeGroup',
        'Country',
        'Description',
        'Duration',
        'GenreList',
        'ID',
        'Name',
        'PathToAvatar',
        'PathToSliderAvatar',
        'Producer',
        'Rating',
        'RatingCount',
        'ReleaseYear',
    ]),
    ProfileData: new Set([
        'login',
        'name',
        'surname',
        'pathToAvatar',
    ]),
    ScheduleData: new Set([
        'CinemaID',
        'Cost',
        'HallID',
        'ID',
        'MovieID',
        'PremierTime',
    ]),
    SettingsFormData: new Set([
        'name',
        'surname',
        'avatar',
    ]),
    TicketData: new Set([
        'ID',
        'Login',
        'PlaceField',
        'Schedule',
        'TransactionDate',
    ]),
    TicketScheduleData: new Set([
        'Place',
        'Row',
    ]),
};

export default ExtractedFields;
