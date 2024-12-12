--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.addresses VALUES ('c020c485-3a4c-4390-ac81-b33e84fcb6fd', '2024-12-12 13:46:28.428837+00', '2024-12-12 13:46:28.428837+00', NULL, 'Calle de la Princesa', 'Madrid', '28008', 'España');
INSERT INTO public.addresses VALUES ('897e491d-198c-4699-be03-9fd40447cd71', '2024-12-12 13:48:51.857904+00', '2024-12-12 13:48:51.857904+00', NULL, 'Avenida de América', 'Madrid', '28002', 'España');
INSERT INTO public.addresses VALUES ('9c7067a5-e486-44d3-a630-79db11fd5957', '2024-12-12 13:51:32.847164+00', '2024-12-12 13:51:32.847164+00', NULL, 'Calle de Alcalá', 'Madrid', '28001', 'España');
INSERT INTO public.addresses VALUES ('c402cf1d-1077-47da-a9b8-f76a0cd73230', '2024-12-12 14:03:41.176278+00', '2024-12-12 14:03:41.176278+00', NULL, 'Villaverde bajo', 'Madrid', '28043', 'España');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.users VALUES ('598f3b95-4665-4e73-b211-062077dccd9a', '2024-12-12 13:36:05.719773+00', '2024-12-12 13:44:44.574662+00', NULL, 'Jonathan', 'Freire', 'jonathanfreire@uoc.edu', '$2b$10$Ifrq4G.r0e3Hesy3F1E6xeJjyXx5UNFjvp7p0bey3Z1RxW9hWNzTu', 'https://res.cloudinary.com/dumkmg0kg/image/upload/v1732869707/uploads/a6svqvr4as7kogbxasfn.png');
INSERT INTO public.users VALUES ('013fc76e-270a-4036-8963-86018e69c056', '2024-12-12 13:47:34.739286+00', '2024-12-12 13:47:34.739286+00', NULL, 'Marta', '', 'marta.gomez@mail.com', '$2b$10$okd4.LtubCnMZkTDf.B1eOU8bA.w1yFLsjDlPbcQnfvR5Tr0HRHJq', NULL);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.events VALUES ('61553083-608b-4402-b067-380e568a6f23', '2024-12-12 13:48:51.861731+00', '2024-12-12 13:48:51.861731+00', NULL, 'Jazz en vivo', 'Ven a disfrutar de la mejor música de jazz', 'https://res.cloudinary.com/dumkmg0kg/image/upload/v1734011331/uploads/t7enk8ou1eemp1eikfue.jpg', '2025-01-20 20:00:00+00', '2025-01-20 22:00:00+00', 70, 'Music', '897e491d-198c-4699-be03-9fd40447cd71', '013fc76e-270a-4036-8963-86018e69c056');
INSERT INTO public.events VALUES ('b9266e5a-17e8-42d3-bce0-596a2df47ea3', '2024-12-12 13:51:32.852821+00', '2024-12-12 13:51:32.852821+00', NULL, 'Indie Rock', 'Ven a disfrutar de la mejor música indie', 'https://res.cloudinary.com/dumkmg0kg/image/upload/v1734011425/uploads/w21leqj73obtezmxcg5o.jpg', '2025-01-30 17:00:00+00', '2025-01-30 20:00:00+00', 300, 'Music', '9c7067a5-e486-44d3-a630-79db11fd5957', '013fc76e-270a-4036-8963-86018e69c056');
INSERT INTO public.events VALUES ('572f8386-d445-4073-9111-6fdc2117e39d', '2024-12-12 14:03:41.183189+00', '2024-12-12 14:03:41.183189+00', NULL, 'Campeonato de futbol', 'Ven con tus amigos y participa en un campeonato comunitario', 'https://res.cloudinary.com/dumkmg0kg/image/upload/v1734012060/uploads/r7fppojdgauqtupbiw1z.jpg', '2025-01-18 09:00:00+00', '2025-01-18 20:00:00+00', 50, 'Sports', 'c402cf1d-1077-47da-a9b8-f76a0cd73230', '598f3b95-4665-4e73-b211-062077dccd9a');
INSERT INTO public.events VALUES ('88e06dc6-40e9-4d5b-9c11-d754149fe458', '2024-12-12 13:46:28.440374+00', '2024-12-12 14:06:56.565247+00', NULL, 'Festival de Techno', 'Ven a disfrutar de la mejor música electrónica. Es gratis', 'https://res.cloudinary.com/dumkmg0kg/image/upload/v1734011184/uploads/rgluess7qlohswaq4kny.jpg', '2025-01-08 15:00:00+00', '2025-01-08 21:00:00+00', 500, 'Music', 'c020c485-3a4c-4390-ac81-b33e84fcb6fd', '598f3b95-4665-4e73-b211-062077dccd9a');


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.comments VALUES ('4b4e9c8e-22e1-4df3-978f-08b94fbf6e94', '2024-12-12 14:05:22.403783+00', '2024-12-12 14:05:22.403783+00', NULL, 'Suena increible, espero poder ir', '598f3b95-4665-4e73-b211-062077dccd9a', '61553083-608b-4402-b067-380e568a6f23');
INSERT INTO public.comments VALUES ('e1684b04-bdb5-41d8-a353-1fdb55b011ea', '2024-12-12 14:08:09.912746+00', '2024-12-12 14:08:09.912746+00', NULL, 'me gustaría saber qué djs irán al festival', '013fc76e-270a-4036-8963-86018e69c056', '88e06dc6-40e9-4d5b-9c11-d754149fe458');
INSERT INTO public.comments VALUES ('ba80fe40-7dc6-4951-9f4b-63ae945e2836', '2024-12-12 14:10:31.844285+00', '2024-12-12 14:10:31.844285+00', NULL, 'puedo ir con amigos?', '598f3b95-4665-4e73-b211-062077dccd9a', 'b9266e5a-17e8-42d3-bce0-596a2df47ea3');
INSERT INTO public.comments VALUES ('dda14fea-f838-4cce-96d8-86dd36c5c256', '2024-12-12 14:11:38.105637+00', '2024-12-12 14:11:38.105637+00', NULL, 'el concierto es gratuito?', '598f3b95-4665-4e73-b211-062077dccd9a', 'b9266e5a-17e8-42d3-bce0-596a2df47ea3');


--
-- Data for Name: events_participants; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.events_participants VALUES ('dc3a1a58-b7aa-4ac4-baa7-994c7e7c86a1', '2024-12-12 13:46:38.49674+00', '2024-12-12 13:46:38.49674+00', NULL, '88e06dc6-40e9-4d5b-9c11-d754149fe458', '598f3b95-4665-4e73-b211-062077dccd9a');
INSERT INTO public.events_participants VALUES ('b007b23e-1a86-46bd-9af2-d3b198d9d977', '2024-12-12 13:51:42.742756+00', '2024-12-12 13:51:42.742756+00', NULL, 'b9266e5a-17e8-42d3-bce0-596a2df47ea3', '013fc76e-270a-4036-8963-86018e69c056');
INSERT INTO public.events_participants VALUES ('4a47bc18-e636-4ddc-a2af-deebc4bda726', '2024-12-12 13:51:54.092225+00', '2024-12-12 13:51:54.092225+00', NULL, '88e06dc6-40e9-4d5b-9c11-d754149fe458', '013fc76e-270a-4036-8963-86018e69c056');
INSERT INTO public.events_participants VALUES ('b496646b-6730-4be5-8d0a-e6a5e0777691', '2024-12-12 14:04:06.019605+00', '2024-12-12 14:04:06.019605+00', NULL, '572f8386-d445-4073-9111-6fdc2117e39d', '598f3b95-4665-4e73-b211-062077dccd9a');
INSERT INTO public.events_participants VALUES ('0ef1f00e-d71c-4faf-8cd1-d5eca3c5a6fc', '2024-12-12 14:14:39.919894+00', '2024-12-12 14:14:39.919894+00', NULL, '61553083-608b-4402-b067-380e568a6f23', '013fc76e-270a-4036-8963-86018e69c056');
INSERT INTO public.events_participants VALUES ('414b5135-1ada-473b-92cd-bec6607ce8ec', '2024-12-12 14:14:56.223344+00', '2024-12-12 14:14:56.223344+00', NULL, '61553083-608b-4402-b067-380e568a6f23', '598f3b95-4665-4e73-b211-062077dccd9a');


--
-- Data for Name: replies; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.replies VALUES ('da48ed36-d900-4e08-b3bb-191750afc638', '2024-12-12 14:08:48.33952+00', '2024-12-12 14:08:48.33952+00', NULL, 'todavía están por confirmar, pero esperamos anunciarlo pronto', 'e1684b04-bdb5-41d8-a353-1fdb55b011ea', '598f3b95-4665-4e73-b211-062077dccd9a');
INSERT INTO public.replies VALUES ('13be061a-07f3-4c2e-b9c6-ca1decb14e77', '2024-12-12 14:09:42.536526+00', '2024-12-12 14:09:42.536526+00', NULL, '100% recomendado', '4b4e9c8e-22e1-4df3-978f-08b94fbf6e94', '013fc76e-270a-4036-8963-86018e69c056');
INSERT INTO public.replies VALUES ('e6878dbc-b037-48c0-94ee-86f0e294f971', '2024-12-12 14:10:57.82462+00', '2024-12-12 14:10:57.82462+00', NULL, 'por supuesto, estáis todos invitados', 'ba80fe40-7dc6-4951-9f4b-63ae945e2836', '013fc76e-270a-4036-8963-86018e69c056');
INSERT INTO public.replies VALUES ('f527ad62-65cb-48db-acac-9bb208cad0f2', '2024-12-12 14:12:18.143299+00', '2024-12-12 14:12:18.143299+00', NULL, 'sí, la banda se está promocionando y por eso es un evento gratuito', 'dda14fea-f838-4cce-96d8-86dd36c5c256', '013fc76e-270a-4036-8963-86018e69c056');


--
-- Data for Name: users_favourite_events; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.users_favourite_events VALUES ('589471b4-9025-4367-87eb-9bd7af3bf29a', '2024-12-12 13:47:38.755721+00', '2024-12-12 13:47:38.755721+00', NULL, '88e06dc6-40e9-4d5b-9c11-d754149fe458', '013fc76e-270a-4036-8963-86018e69c056');
INSERT INTO public.users_favourite_events VALUES ('38857157-e21b-44cd-bd61-8f40be8354c8', '2024-12-12 13:51:47.159874+00', '2024-12-12 13:51:47.159874+00', NULL, 'b9266e5a-17e8-42d3-bce0-596a2df47ea3', '013fc76e-270a-4036-8963-86018e69c056');
INSERT INTO public.users_favourite_events VALUES ('45178714-4218-4ee5-ac2d-cf93f0f64e9b', '2024-12-12 14:12:47.337792+00', '2024-12-12 14:12:47.337792+00', NULL, '572f8386-d445-4073-9111-6fdc2117e39d', '598f3b95-4665-4e73-b211-062077dccd9a');
INSERT INTO public.users_favourite_events VALUES ('29ae1195-7277-4310-8b7f-77afc21c9a77', '2024-12-12 14:12:48.271551+00', '2024-12-12 14:12:48.271551+00', NULL, 'b9266e5a-17e8-42d3-bce0-596a2df47ea3', '598f3b95-4665-4e73-b211-062077dccd9a');
INSERT INTO public.users_favourite_events VALUES ('b0eeee0f-d8c0-4cee-a269-c65d908338c5', '2024-12-12 14:12:51.906341+00', '2024-12-12 14:12:51.906341+00', NULL, '61553083-608b-4402-b067-380e568a6f23', '598f3b95-4665-4e73-b211-062077dccd9a');


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

