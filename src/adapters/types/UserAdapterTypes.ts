export type User = {
  user: {
    id: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    dob: string | null;
    email: string;
    phone_number: string | null;
    profile_completed: boolean | null;
    gender: string | null;
    blood_type: string | null;
    blood_group: string | null;
    appointments: null;
  };
};
