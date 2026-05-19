//  the rate limiter will save server from bruteforce and ddOS attack 
// split in batches and send mail 
// 

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendInBatches = async ({ recipients, sendFn, batchSize = 10, delayMs = 1000 }) => {
  const results = { sent: 0, failed: 0, skipped: 0, errors: [] };

  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    const settled = await Promise.allSettled(
      batch.map((r) => sendFn(r))
    );

    settled.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        results.sent++;
      } else {
        results.failed++;
        results.errors.push({ email: batch[idx], reason: result.reason?.message });
      }
    });

    if (i + batchSize < recipients.length) {
      await sleep(delayMs);
    }
  }

  return results;
};

export default sendInBatches;