import type { Chapter } from "../types";

export const shadowsClosingIn: Chapter = {
  slug: "shadows-closing-in", order: 9, title: "Shadows Closing In", subtitle: "Chapter Nine",
  summary: "Dyia follows the Dust through frightened witnesses and respectable accounts. The Seats demand results while limiting the inquiry. Alethea protects her patients' trust, and Hanno discovers how much concealment now costs.",
  mood: "night", when: "Now", status: "draft", music: "/audio/ambient-night.wav", cover: "/images/chronicle/shadows.webp",
  scenes: [
    { id: "title", kind: "title", heading: "Shadows Closing In", text: ["Chapter Nine"], mood: "night" },
    { id: "beneath-the-veneer", heading: "Beneath the Veneer", pov: "dyia", mood: "void", text: [
      "The magistrate's nephew will not give his name. Dyia already knows it; everybody in the room knows it. The young man has been found unconscious in a hired chair outside a closed gaming house, and the men carrying him were arrested for theft because nobody could find his purse.",
      "Now he sits wrapped in a blanket at Alethea's clinic, asking whether his uncle has been informed. One of the chair carriers waits by the door, rubbing his wrists. His partner is still at the garrison. They have lost a night's wages and a deposit on the chair.",
      "\"Did these men take your purse?\" Dyia asks.",
      "The nephew says he does not remember. Alethea looks up from her notes. Dyia waits. A breeze lifts the curtain behind the bed, revealing a row of rooftops and somebody hanging washing.",
      "\"I gave it to the woman at the house,\" the nephew says at last. \"To settle what I owed. I think.\"",
      "Dyia writes an order releasing the second carrier. He gives it to the first man, who reads it slowly before asking about the chair. There is no money in the captain's authority for a lost deposit. Dyia arranges to speak to its owner. The man leaves with a promise where he needed payment.",
      "Only then does Dyia ask about the Dust. The nephew describes a supper, a host who supplied it, a morning that seemed not to belong to the night before. He is frightened enough to answer until Dyia asks where the host obtained it. Then he looks toward the doorway, listening for people who are not there.",
      "\"He will say I stole it.\"",
      "Alethea tells him he can remain at the clinic while they consider what to do. She says it before looking at Dyia, making clear that his permission is unnecessary. He notices the young man's shoulders lower.",
      "Outside, the chair carrier is still waiting for someone to explain how to get his partner released. Dyia takes him along. By noon he has one possible witness, two wrongly detained men, and a household ready to make the first disappear into a country residence. The case is already larger than the powder in its evidence jar."
    ] },
    { id: "dead-ends", heading: "Dead Ends", pov: "dyia", mood: "night", location: "carthara", image: "/images/chronicle/shadows.webp", text: [
      "The first storeroom contains soap, lamp oil, and exactly the quantity of cloth its register promises. Dyia examines the empty shelves while a porter protests that they are searching the wrong place. His information came from the nephew's host, who insisted this was where the goods were collected.",
      "\"Collected when?\" the sergeant asks.",
      "The porter gives a day. The storeroom was rented to somebody else that day. The rent book says so, although its owner cannot produce the man who wrote the entry. Every answer arrives with an address attached, and every address sends them somewhere another answer ought to be.",
      "Dyia takes the book rather than the porter. Outside, his sergeant says they might learn more by keeping the man overnight. He might remember something once he understands the seriousness of the inquiry.",
      "Dyia looks at the porter's hands. They are clenched around his cap, the cap being apparently the only object he is still allowed to control. The captain remembers a woman asking for a key, and a record that contained only a knife.",
      "\"Or he might give us the name he thinks we want.\"",
      "They copy the porter's account and leave him at work. This does not make the day successful. By evening the host retracts his first statement. A solicitor arrives with a complaint about unauthorized interference in a respectable household. The magistrate's nephew is taken away by his family before Dyia can speak to him again.",
      "The sergeant lays three records beside each other. Different carriers, different sellers, different goods surrounding the Dust. He has marked a repeated payment office. Dyia almost dismisses it as too ordinary. The office also handles wages for legitimate businesses and subscriptions to public works.",
      "\"That is why nobody remembers which payment mattered,\" the sergeant says.",
      "Dyia sends a request for the relevant accounts. He keeps the dates narrow and lists the grounds. He has learned how easily a vague request becomes a reason for refusing everything. The answer arrives two days later: the papers require the approval of a patron whose business includes contracts with the First Seat.",
      "He pins the refusal beside the three statements. The wall is beginning to show a pattern, though he cannot yet say whether it is a criminal design or the city's ordinary habit of shielding its money. He suspects the distinction will not remain comfortable."
    ] },
    { id: "numarius-stirs", heading: "Numarius Stirs", pov: "dyia", mood: "storm", ambient: "/audio/ambient-wind.wav", text: [
      "Numarius receives him without offering a chair. A steward is already present with figures concerning lost labor and unpaid household accounts. Dyia cannot tell how much the steward understands; the man speaks of the Dust as if it were weather interfering with deliveries.",
      "The First Seat asks why there have been so few arrests. Dyia explains the missing records, the returned witnesses, the difference between finding someone with the substance and finding the people who profit from it.",
      "\"You were not always so particular, Captain.\"",
      "Dyia keeps his eyes on the papers. He hears the warning clearly enough. His old reputation can be used to demand more violence or to punish him for the violence already done.",
      "\"Arresting a carrier will not restore your accounts.\"",
      "The steward looks at him sharply. Numarius lays a hand flat on the desk. \"I am asking you to restore order.\"",
      "\"Then I need access to the payment records.\"",
      "It takes the rest of the audience to get a signature. It authorizes less than Dyia requested. Names of clients unconnected with the specified transactions are to remain concealed; household records require another application. Numarius calls this sufficient and dismisses him.",
      "In the corridor, Vael reads the permission before Dyia can put it away. Corvo stands beside an open window, speaking to an official about the cost of keeping a ship at anchor. She finishes that business before turning toward them.",
      "\"If your men delay every cart for a jar they cannot identify,\" she says, \"the ordinary cargo will rot while the unusual cargo finds another day. Tell customs what you can actually distinguish.\"",
      "Dyia says he has asked practitioners for descriptions. He has not found anyone willing to identify the source. Corvo studies the restricted authorization.",
      "\"The First Seat seems more anxious about who you might see than what you might find.\"",
      "Vael folds the permission and returns it. \"Use what you have. Bring me refusals in writing.\"",
      "Neither promises protection. Neither says Numarius is a suspect. Still, they have spoken of his instructions as something to be examined rather than obeyed, and Dyia knows enough about this building to hear the difference. He leaves carrying a small permission and the larger danger of becoming useful in an argument he does not control."
    ] },
    { id: "closer-than-he-imagines", heading: "Closer Than He Imagines", pov: "hanno", mood: "void", text: [
      "The broker brings the guard's request in a stained envelope. It has passed through three hands before reaching Hanno. There are questions about a payment office, dates he recognizes, names he does not. Someone has underlined a passage concerning botanical purchases and drawn a mark in the margin as if Hanno might fail to understand it.",
      "He has not watched every step. For weeks he believed Dyia was occupied with gaming houses and private rooms. Now an account he considered distant from the supply has become important. He reads the questions twice, hearing his brother's insistence in their unadorned order.",
      "\"You said this would stay among people who could afford discretion,\" the broker says.",
      "\"I said where I wanted it sold.\"",
      "\"And I told you what that promise was worth.\"",
      "They sit above the warehouse listening to wheels strike a loose stone below. Hanno wants to blame the man for carelessness. He also wants him frightened enough to follow instructions. Those desires pull against each other: a frightened man may obey, or he may carry what he knows to someone who can offer better terms.",
      "Hanno ends two supply agreements and pays for stock that will never reach the buyers who expected it. The loss angers him more than he anticipated. He once thought money would free him from being owned. Now he calculates how much of it will make someone continue keeping a secret.",
      "The broker asks what he should tell a seller whose customer has been taken ill. Hanno almost answers as a practitioner. He wants to know the symptoms, the duration, whether the person has someone to stay with them. He catches himself before the concern reveals too much.",
      "\"Send them to a clinic.\"",
      "\"Yours?\"",
      "\"Whichever will take them.\"",
      "At home, he removes a notebook from the shelf beside his travel journals. Alethea has placed a strip of red cloth in one of the old volumes as a bookmark. He cannot remember what they were looking up together. He places the hidden notebook in another cupboard and stands looking at the gap it leaves.",
      "Moving it changes nothing about what he has written. It makes his hand shake all the same. Downstairs, a messenger asks for an answer to another guard inquiry. Hanno will give enough of the truth to remain helpful. He is beginning to understand that every such answer teaches Dyia how to ask the next question."
    ] },
    { id: "alethea-watches", heading: "Alethea", pov: "alethea", mood: "dawn", text: [
      "Alethea refuses to surrender the clinic book. Dyia has brought permission to inspect treatment records relating to the new substance, and she has prepared copies stripped of names. He says the names may be the point.",
      "\"Then explain which person you need and why.\"",
      "\"I cannot know that before I see them.\"",
      "\"And people cannot know they can come here if every answer they give me becomes an arrest record.\"",
      "He looks around the room. A woman sleeps behind a screen; a man at the far table is trying to write a message with a hand that will not hold still. Alethea knows the inquiry matters. She has seen what the Dust does to families before any official count admits they exist. She is also the person to whom they come after deciding whom they dare trust.",
      "She offers to ask patients whether they will speak. She will preserve the records and identify common symptoms, approximate dates, the ordinary circumstances they describe. For a named record, he must bring a specific reason and the authority to demand it. He looks as though he would prefer a simpler antagonist.",
      "\"Will you tell my brother I came?\"",
      "\"That you came, yes. What a patient said, no. The same rule applies to him.\"",
      "After Dyia leaves, the clinic steward asks whether the guard will close them. Alethea says she does not think so. The steward waits for an answer that can be used to pay wages. Alethea brings out the separate account and shows how much is available if the workshop's support stops. It is less than either would like.",
      "They begin planning transfers for people whose care cannot be interrupted. Alethea writes to two practitioners she trusts and asks what they could take on. She does not intend to abandon the clinic. She intends that a threatened room should not become another way to hold its patients hostage.",
      "At supper Hanno asks whether Dyia was rude. She says he was persistent. Her husband smiles with an affection that surprises her. For a moment she can see the boy who must have loved his younger brother before every recollection acquired an injury.",
      "She tells him about the transfer arrangements. He says there is no need; he will always support the clinic. She asks him to make the next payment before the month ends. He agrees, then asks whether she has seen a particular merchant among the patients. She sets down her spoon. He apologizes before she answers, which tells her that he already knew the question was wrong."
    ] },
    { id: "reckoning", heading: "Reckoning", pov: "dyia", mood: "ember", ambient: "/audio/ambient-ember.wav", sfx: "/audio/sfx-ember.wav", text: [
      "The permitted accounts arrive with several names covered by pasted slips. Dyia resists the temptation to tear them off. The copy is certified; damaging it would let its owner dispute anything he found underneath. He lays it beside the statements and begins with what he can see.",
      "A payment made on one of the relevant dates belongs to a supplier used by several prominent practices. Another concerns a lease on cultivated ground. Neither proves a crime. Together they give him something narrower than a rumor about wealthy houses: someone in the circle paying for medicines and private experiments may also be paying the people whose goods carried the Dust.",
      "The sergeant asks whether Hanno can identify the purchasers. Dyia almost agrees. His brother knows this business, knows the abbreviations that have cost them half the afternoon. Then he remembers Alethea refusing to open her book merely because a uniform asked.",
      "\"Not yet. We should ask the people who made the entries first.\"",
      "He still thinks of Hanno as someone whose work another man might be using. He thinks of Numarius's supper guests, the host who changed his statement, the many ways a patron can take possession without appearing on a receipt. His suspicion has entered his brother's world without yet settling on his brother.",
      "There is a separate request from the clinic: one patient is willing to speak if the captain will meet him away from the garrison. Dyia writes an acceptance in his own hand. He tells the sergeant where he is going and asks him to retain the copies in case the originals are requested back.",
      "Before leaving, he drinks water from Amara's bowl. The foot sits unevenly on the desk; he steadies it with two fingers. He thinks of asking the storeroom keeper once more about the brass weight. There are promises in this case smaller than bringing down a great man, and they have not stopped mattering because he has found a larger suspect.",
      "He carries no drawn weapon when he goes out. The lamps are coming on along the stairs. Somewhere beyond the market, a person is deciding whether to keep an appointment with him. Dyia walks slowly enough to arrive before the agreed hour."
    ] }
  ]
};
