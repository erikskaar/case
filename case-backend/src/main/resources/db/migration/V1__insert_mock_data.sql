INSERT INTO form (form_id, club_id, title, registration_opens)
VALUES (
           'B171388180BC457D9887AD92B6CCFC86',
           'britsport',
           'Coding camp summer 2025',
           '2024-12-16T00:00:00Z'
       );

-- Insert into member_type
INSERT INTO member_type (id, name, form_id)
VALUES
    ('8FE4113D4E4020E0DCF887803A886981', 'Active Member', 'B171388180BC457D9887AD92B6CCFC86'),
    ('4237C55C5CC3B4B082CBF2540612778E', 'Social Member', 'B171388180BC457D9887AD92B6CCFC86');
