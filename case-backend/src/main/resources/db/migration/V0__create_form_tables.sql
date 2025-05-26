CREATE TABLE form
(
    form_id            TEXT PRIMARY KEY,
    club_id            TEXT                     NOT NULL,
    title              TEXT                     NOT NULL,
    registration_opens TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE member_type
(
    id      TEXT PRIMARY KEY,
    name    TEXT NOT NULL,
    form_id TEXT NOT NULL,
    FOREIGN KEY (form_id) REFERENCES form (form_id) ON DELETE CASCADE
);

CREATE TABLE form_input
(
    id             TEXT PRIMARY KEY,
    form_id        TEXT      NOT NULL,
    FOREIGN KEY (form_id) REFERENCES form (form_id) ON DELETE CASCADE,
    member_type_id TEXT      NOT NULL,
    FOREIGN KEY (member_type_id) REFERENCES member_type (id) ON DELETE CASCADE,
    name           TEXT      NOT NULL,
    phone_number   TEXT      NOT NULL,
    birth_date     TIMESTAMP NOT NULL
);
