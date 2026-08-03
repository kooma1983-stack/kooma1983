CREATE TABLE tally_results (
    id INT PRIMARY KEY,
    raw_text TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 누구나 조회 및 수정 가능하도록 정책 설정 (Anon 권한)
ALTER TABLE tally_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON tally_results FOR ALL USING (true) WITH CHECK (true);