/*
  # Add Sample Data for Testing

  This migration adds sample data to help test the AGRIA application:
  
  1. Sample Data Added
    - 1 test user (éleveur)
    - 3 lots de porcs with realistic data
    - 2 lots de volailles
    - 1 lot de bovins
    - Several notifications for testing alerts
    
  2. Notes
    - This is DEMO data for development/testing
    - In production, remove this migration or use real data
    - User password should be set via Supabase Auth, not directly in users table
*/

-- Insert sample user (you'll need to create auth user separately via Supabase dashboard)
-- This is just the profile data
INSERT INTO users (id, phone, name, region, species_types)
VALUES 
  ('00000000-0000-0000-0000-000000000001', '+2250700000000', 'Test Éleveur', 'Abidjan', ARRAY['porc', 'volaille', 'bovin']::text[])
ON CONFLICT (id) DO NOTHING;

-- Insert sample lots for porcs
INSERT INTO lots (
  user_id, species, name, start_date, 
  current_count, initial_count, mortality_count,
  avg_weight, avg_daily_gain, production_value,
  feed_cost, vet_cost, other_cost, estimated_revenue, margin_percent
) VALUES
  (
    '00000000-0000-0000-0000-000000000001', 'porc', 'Lot Alpha', 
    CURRENT_DATE - INTERVAL '90 days',
    47, 50, 3,
    85.5, 650, 0,
    2850000, 180000, 120000, 4230000, 26.2
  ),
  (
    '00000000-0000-0000-0000-000000000001', 'porc', 'Lot Beta', 
    CURRENT_DATE - INTERVAL '60 days',
    98, 100, 2,
    62.3, 580, 0,
    4200000, 240000, 150000, 6125000, 33.5
  ),
  (
    '00000000-0000-0000-0000-000000000001', 'porc', 'Lot Gamma', 
    CURRENT_DATE - INTERVAL '30 days',
    100, 100, 0,
    38.7, 720, 0,
    1800000, 95000, 60000, 2950000, 47.8
  )
ON CONFLICT DO NOTHING;

-- Insert sample lots for volailles
INSERT INTO lots (
  user_id, species, name, start_date, 
  current_count, initial_count, mortality_count,
  avg_weight, avg_daily_gain, production_value,
  feed_cost, vet_cost, other_cost, estimated_revenue, margin_percent
) VALUES
  (
    '00000000-0000-0000-0000-000000000001', 'volaille', 'Pondeuses Bâtiment 1', 
    CURRENT_DATE - INTERVAL '180 days',
    680, 700, 20,
    1.8, 0, 89.5,
    850000, 45000, 30000, 1450000, 56.8
  ),
  (
    '00000000-0000-0000-0000-000000000001', 'volaille', 'Pondeuses Bâtiment 2', 
    CURRENT_DATE - INTERVAL '120 days',
    600, 620, 20,
    1.9, 0, 87.2,
    720000, 38000, 25000, 1280000, 63.4
  )
ON CONFLICT DO NOTHING;

-- Insert sample lot for bovins
INSERT INTO lots (
  user_id, species, name, start_date, 
  current_count, initial_count, mortality_count,
  avg_weight, avg_daily_gain, production_value,
  feed_cost, vet_cost, other_cost, estimated_revenue, margin_percent
) VALUES
  (
    '00000000-0000-0000-0000-000000000001', 'bovin', 'Troupeau Laitier', 
    CURRENT_DATE - INTERVAL '365 days',
    42, 45, 3,
    420.0, 0, 18.5,
    3200000, 450000, 280000, 5850000, 48.7
  )
ON CONFLICT DO NOTHING;

-- Insert sample notifications
INSERT INTO notifications (user_id, type, message, scheduled_date, is_read)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'vaccination',
    'Vaccination porcs - Lot Alpha',
    CURRENT_DATE + INTERVAL '1 day' + TIME '08:00:00',
    false
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'controle',
    'Contrôle ponte pondeuses',
    CURRENT_DATE + TIME '18:00:00',
    false
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'visite_veterinaire',
    'Visite vétérinaire mensuelle',
    CURRENT_DATE + INTERVAL '7 days',
    false
  )
ON CONFLICT DO NOTHING;
