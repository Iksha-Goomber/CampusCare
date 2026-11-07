import type { Complaint, Priority } from './types';
const categories: Record<string,string[]> = {
  Plumbing:['water','tap','leak','pipe','flush','toilet','drain','washroom','basin'],
  Electrical:['electric','light','bulb','fan','power','socket','switch','wire','ac','air conditioner'],
  Cleaning:['dirty','clean','garbage','dustbin','smell','hygiene','mosquito','pest'],
  Furniture:['chair','desk','table','bench','door','window','broken','lock'],
  Internet:['wifi','wi-fi','internet','network','router','connection'],
  Infrastructure:['road','ceiling','wall','floor','lift','elevator','building','classroom']
};
export function classify(text:string):{category:string;priority:Priority;reason:string}{
 const s=text.toLowerCase(); let best='Other',score=0;
 for(const [cat,words] of Object.entries(categories)){const n=words.reduce((a,w)=>a+(s.includes(w)?1:0),0);if(n>score){best=cat;score=n;}}
 const critical=['fire','smoke','spark','exposed wire','electrical shock','gas leak','flood','burst pipe'];
 const high=['urgent','unsafe','not working','overflow','no water','power outage','broken glass','security'];
 const priority:Priority=critical.some(w=>s.includes(w))?'Critical':high.some(w=>s.includes(w))?'High':score>0?'Medium':'Low';
 return {category:best,priority,reason:priority==='Critical'?'Potential immediate safety risk detected':priority==='High'?'Service disruption or urgent wording detected':score?'Issue keywords matched the category':'No strong keyword match; staff can review'};
}
function tokens(s:string){return new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(x=>x.length>2));}
export function findDuplicate(text:string,items:Complaint[]){const a=tokens(text);let best:Complaint|undefined,score=0;for(const item of items){const b=tokens(item.title+' '+item.description);const intersection=[...a].filter(x=>b.has(x)).length;const similarity=intersection/Math.max(1,new Set([...a,...b]).size);if(similarity>score){score=similarity;best=item;}}return score>=0.48?{item:best!,similarity:Math.round(score*100)}:null;}
