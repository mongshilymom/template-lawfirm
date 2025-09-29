"use client";
import { useState } from 'react';

export default function ContractTemplate() {
  const [partyA, setPartyA] = useState('');
  const [partyB, setPartyB] = useState('');
  const [subject, setSubject] = useState('');
  const [contract, setContract] = useState<string | null>(null);

  const generate = () => {
    const doc = `
계약서

제1조 (목적) 본 계약은 ${subject}에 관한 권리와 의무를 규정함을 목적으로 한다.

제2조 (당사자) 갑: ${partyA}, 을: ${partyB}.

제3조 (계약 내용) 갑과 을은 상호 신뢰를 바탕으로 ${subject}를 성실히 이행한다.

제4조 (분쟁 해결) 본 계약에 관한 분쟁은 관할 법원을 통해 해결한다.

본 계약을 증명하기 위하여 갑과 을은 본 계약서 2부를 작성하여 각자 서명 날인 후 1부씩 보관한다.
    `;
    setContract(doc);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <h1 className="text-3xl font-heading mb-4">계약서 자동생성</h1>
      <p>간단한 정보를 입력하여 기본 계약서를 생성해보세요.</p>
      <div>
        <label className="block mb-1">갑 (Party A)</label>
        <input value={partyA} onChange={(e) => setPartyA(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div>
        <label className="block mb-1">을 (Party B)</label>
        <input value={partyB} onChange={(e) => setPartyB(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div>
        <label className="block mb-1">계약 목적</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <button onClick={generate} className="btn-primary">계약서 생성</button>
      {contract && (
        <pre className="mt-4 p-4 border rounded-md bg-legend-platinum dark:bg-gray-900 whitespace-pre-wrap text-sm">
          {contract}
        </pre>
      )}
    </div>
  );
}