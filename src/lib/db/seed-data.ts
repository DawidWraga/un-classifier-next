export const seedDataSql = `
-- Seed Data
INSERT INTO goals (name, description) VALUES
('No Poverty', 'End poverty in all its forms everywhere'),
('Zero Hunger', 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture'),
('Quality Education', 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all');

INSERT INTO targets (goal_id, name, description) VALUES
(1, 'Extreme poverty eradication', 'By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day'),
(1, 'Poverty reduction', 'By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions'),
(2, 'End hunger', 'By 2030, end hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious and sufficient food all year round'),
(2, 'End malnutrition', 'By 2030, end all forms of malnutrition, including achieving, by 2025, the internationally agreed targets on stunting and wasting in children under 5 years of age'),
(3, 'Free primary and secondary education', 'By 2030, ensure that all girls and boys complete free, equitable and quality primary and secondary education leading to relevant and effective learning outcomes'),
(3, 'Early childhood development', 'By 2030, ensure that all girls and boys have access to quality early childhood development, care and pre-primary education so that they are ready for primary education');

INSERT INTO keywords (target_id, keyword) VALUES
(1, 'extreme poverty'),
(1, 'poverty eradication'),
(1, 'income inequality'),
(2, 'poverty reduction'),
(2, 'social protection'),
(2, 'economic empowerment'),
(3, 'food security'),
(3, 'hunger elimination'),
(3, 'nutrition access'),
(4, 'malnutrition'),
(4, 'stunting'),
(4, 'child nutrition'),
(5, 'primary education'),
(5, 'secondary education'),
(5, 'education quality'),
(6, 'early childhood education'),
(6, 'pre-primary education'),
(6, 'child development');
`;
