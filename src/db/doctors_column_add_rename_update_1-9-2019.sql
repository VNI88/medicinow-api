ALTER TABLE doctors
  RENAME COLUMN id TO doctor_id,
	ADD COLUMN SPECIALITY VARCHAR(20);

ALTER TABLE appointments
	ALTER COLUMN appointment_hour TYPE TIME USING appointment_hour::time without time zone;
