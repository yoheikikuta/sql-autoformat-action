WITH
  -- This is the first test comment.
  Numbers AS (
    SELECT
      90 AS A,
      2 AS B
    UNION ALL
    SELECT
      50,
      8
    UNION ALL
    SELECT
      60,
      6
    UNION ALL
    SELECT
      50,
      10
  ) -- This is the second test comment.
SELECT
  A,
  B,
  CASE A
    WHEN 90 THEN 'red'
    WHEN 50 THEN 'blue'
    ELSE 'green'
  END AS result
FROM
  Numbers;
