export type SearchServiceProvider = {
  data: [
    {
      created_at: string;
      updated_at: string;
      languages: string[];
      specialty: string;
      rating: number;
      price: string | number | null;
      practice_start_date: string | null;
      verified: boolean | null;
      status: string | null;
      email: string;
      service_type: string | null;
      first_name: string;
      last_name: string;
      id: string;
      bio: string | null;
      profile_image: string | null;
      years_of_experience: string;
      working_hours: {
        monday?: DaySchedule;
        tuesday?: DaySchedule;
        wednesday?: DaySchedule;
        thursday?: DaySchedule;
        friday?: DaySchedule;
        saturday?: DaySchedule;
        sunday?: DaySchedule;
      };
    }
  ];
};

export type DaySchedule = {
  isAvailable: boolean;
  slots: { start: string; end: string }[];
};

export type ServiceProviderDetails = {
  data: {
    created_at: string;
    updated_at: string;
    languages: string[];
    specialty: string;
    rating: number;
    price: string | number | null;
    practice_start_date: string | null;
    verified: boolean | null;
    status: string | null;
    email: string;
    service_type: string | null;
    first_name: string;
    last_name: string;
    id: string;
    bio: string | null;
    profile_image: string | null;
    years_of_experience: string;
    sub_account_id: string;
    working_hours: {
      monday?: DaySchedule;
      tuesday?: DaySchedule;
      wednesday?: DaySchedule;
      thursday?: DaySchedule;
      friday?: DaySchedule;
      saturday?: DaySchedule;
      sunday?: DaySchedule;
    };
  };
};
