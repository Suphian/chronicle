import type { Chapter } from "../types";

export const shadowsAndAccusations: Chapter = {
  slug: "shadows-and-accusations", order: 6, title: "Shadows and Accusations", subtitle: "Chapter Six",
  summary: "Amara begins earning her own money again. Sinna offers a final remedy; after her death, Hanno follows the evidence toward his former master and prepares a shipment the old man will want to steal.",
  mood: "void", when: "The betrayal", status: "draft", music: "/audio/ambient-night.wav", cover: "/images/chronicle/shadows.webp",
  scenes: [
    { id: "title", kind: "title", heading: "Shadows and Accusations", text: ["Chapter Six"], mood: "void" },
    { id: "false-kindness", heading: "False Kindness", pov: "amara", mood: "void", text: [
      "The sixth bowl leans to the left. Amara turns its board until the afternoon light crosses the rim, then presses it back into clay. Five saleable bowls are better than six apologies. Her son has offered to buy whatever she makes, which is generous of him and entirely beside the point.",
      "She works in the courtyard on a borrowed bench, shaping the bowls by hand. At the end of the month she means to pay for space in another potter's kiln. Nobody will call a magistrate to admire the results. A woman who sells olives has ordered twelve bowls of the same size, and Amara intends that they shall be the same size.",
      "Master Sinna appears at the gate with a cloth-wrapped bottle. He wears his good coat, with the fastening shaped like a closed leaf. She remembers it from the day she took Hanno to him. She remembers an ointment he once gave Dyia when a burn would not heal. There were kindnesses. The past becomes harder to arrange when she remembers them.",
      "\"Your son is busy,\" he says. \"I thought I might find you here.\"",
      "\"If you want a bowl, you will have to order it.\"",
      "He smiles. \"Then you are well enough to bargain. Excellent.\"",
      "The bottle bears a label like those on Hanno's medicine. Amara wipes her hands before picking it up. Her treatment record is indoors. Alethea insists that every change go into it, including the bad nights. Her sons remember her worst day whenever they look at her; the book remembers other days as well.",
      "\"A refinement,\" Sinna says. \"The final portion of the course. Your son has done remarkable work, but a practice grows quickly. Finishing a patient's treatment can become a small thing beside a hundred new patients.\"",
      "\"He has not forgotten me.\"",
      "\"No. I taught him better.\"",
      "That is the difficulty. Sinna did teach him. Hanno holds a measuring spoon the way the old man showed him, and sometimes uses the same impatient sound when a question interrupts his work. She has heard her son complain that Sinna claims too much. She has also heard him speak as if he learned everything alone.",
      "\"Will this stop the visits? All the checking?\"",
      "\"It should free you from the need.\"",
      "She thinks of carrying bowls across the city without explaining where she is going. Of a room where concern does not enter before she does. Before she drinks, she writes Sinna's name in the record, with the date and the words final remedy. Her handwriting has grown steadier. She is pleased that he can see it."
    ] },
    { id: "amara", heading: "Amara", pov: "hanno", mood: "night", sfx: "/audio/sfx-ember.wav", text: [
      "The boy who comes for Hanno has run through spilled charcoal. Black dust marks his knees. Hanno catches his shoulders to make him speak, then releases him because the boy is trying to breathe and cannot do both things at once.",
      "\"Your mother. The courtyard.\"",
      "He follows the boy through the passage. Alethea kneels beside the bench. When she looks up he knows how far away he is. Not in streets or minutes. He has been working at the front of the same building. A woman brought her father, and the father thanked him twice, and Hanno took time to ask whether the old man remembered buying fruit from Adil.",
      "He says his mother's name. Her hand is cool where the clay has dried. He searches her face for the small annoyance with which she receives his interruptions. Alethea catches his wrist before he lifts her.",
      "\"Let me finish,\" she says, although there is nothing left that will bring Amara back.",
      "He kneels. Five bowls stand above him. One carries a thumbprint just below the rim, a crescent she would have smoothed away before firing. He wants to touch it and knows touching it would destroy it.",
      "Later, with people in the house, he asks who has moved the cup. Alethea has put it with the bottle in a covered tray. She shows him the record. At first he cannot read past his mother's handwriting. He remembers teaching her a shorter mark for a repeated measure, and her refusing because she preferred to know what she had written.",
      "\"I gave her nothing today.\"",
      "\"I know.\"",
      "They compare the bottle with remedies in the workshop. The examination is familiar work performed by unfamiliar hands. They keep the remains separate, compare their retained samples, and write down what each observes before speaking. Alethea insists on that last part.",
      "The contents are Ravash. Not a failed batch of his remedy, or his remedy made stronger. Someone has given Amara the substance they have spent so long helping her leave.",
      "\"He told her it was mine.\"",
      "\"We know what she wrote,\" Alethea says. \"We know what is in the bottle. Keep those things separate until we know the rest.\"",
      "He hates the distinction. Later he is grateful for it, and hates her a little for making him grateful."
    ] },
    { id: "whispers", heading: "Whispers", pov: "hanno", mood: "storm", text: [
      "By the second morning three patients have failed to return. One sends back an unopened bottle with a servant who will not cross the threshold. A council secretary requests a statement about an unfortunate incident during treatment. He has heard that the mother's condition embarrassed the son.",
      "\"Who told you that?\"",
      "The secretary studies his cuffs. Lord Numarius wishes the matter handled impartially. Until it is resolved, no official recommendation can be made concerning the practice.",
      "Hanno submits the record and a sealed portion of the bottle's contents. Alethea keeps copies. Dyia comes in uniform to take their statements, remaining on the visitor's side of the worktable even when Hanno asks him to sit.",
      "\"She put his name down herself.\"",
      "\"I can see that.\"",
      "\"Then why are you still here?\"",
      "Dyia's mouth tightens. \"Because if I take him without a witness to what he gave her, his patrons will call it a family quarrel. Because you and your wife are witnesses and interested parties. I will have to put what he says beside what you say, even when I do not like it.\"",
      "Hanno nearly asks whether such considerations troubled him in the alleys. He does not know enough about his brother's patrols to make the accusation precise. He knows enough to want to hurt him with it.",
      "Instead he goes to Sinna's street, carrying unused bottles that once belonged to the shop. He asks the apprentice sweeping the step to check the count. Inside, on the desk where Hanno worked, fresh labels are drying.",
      "The boy says Sinna prepared a private remedy for Mistress Averroes. He copied its label, then was sent outside. He did not see what went into it. Yes, the master carried it away himself. Asked whether he will tell the captain, the boy looks toward the stairs.",
      "\"I sleep here.\"",
      "Hanno remembers the mattress behind the shelves. He slept there through a winter when his mother's room was too crowded. For a moment the shop is not smaller than he remembers.",
      "Sinna appears before he can answer. Among listeners pretending to examine jars, the old man expresses sorrow. He understands a son's desperation. A discovery must be tested longer than an ambitious practitioner wishes.",
      "\"You delivered a final remedy,\" Hanno says.",
      "\"An ordinary tonic. Perhaps she took something afterward. Neither of us can answer for everything a patient chooses.\"",
      "The answer settles it for Hanno, though it would settle nothing in a hearing. Sinna has prepared a place to put the blame. Hanno leaves before the old man can see him lose control, taking a conviction made from evidence, grief, and familiarity with his teacher that no court can weigh."
    ] },
    { id: "the-shipment", heading: "The Shipment", pov: "hanno", mood: "ember", ambient: "/audio/ambient-ember.wav", text: [
      "For several nights he does nothing. He sits beside the unfinished bowls and waits for grief to become an instruction. Alethea finds someone willing to fire them. Another potter offers to finish the remaining seven. Hanno hears this as if it concerns a trade in another city.",
      "Then he remembers the days when a rich patient asked a question Sinna could not answer. The master would prepare a spectacle: an uncommon material, an extravagant claim, something he could reveal first. He never needed to be the cleverest man in the room if he could be the first to astonish it.",
      "Hanno contacts a merchant handling a consignment from Lysandria. The shipment is real; most of it is ordinary material for the workshop. The parcel he prepares to join it is not. Its contents resemble the discovery his master has always wanted. What he has made will kill anyone who trusts its promise. He writes no account of the work in the workshop book.",
      "He pictures an apprentice opening the parcel instead. A merchant's curious hand. He marks it for examination by the master alone, then recognizes how little writing can control. Sinna usually keeps first discoveries to himself; usually is the word on which Hanno is willing to rest a stranger's life. He sends it knowing he has not made that life safe.",
      "Carrying the parcel downstairs, he finds Alethea showing an assistant how to record a patient's answer without improving its grammar. He watches until she notices him.",
      "\"You could help.\"",
      "\"I have something at the harbor.\"",
      "He lets the story escape in pieces: a visible invoice, a question about storage put to a supplier they share. There is nothing he could later point to and honestly call an accident. He knows what he is arranging, even alone.",
      "A boat misses its berth. The merchant demands an additional fee. For two days Hanno believes Sinna has not heard, and nearly retrieves the parcel. Every delay gives him a chance to stop. He spends those chances resenting the delay.",
      "On the fourth morning the parcel disappears from a bonded storeroom. An old claim against Hanno's apprenticeship stock has been presented. The merchant calls it a dispute over ownership. He wants assurance that he will still be paid.",
      "Hanno pays. By afternoon invitations circulate: Sinna will demonstrate a new restorative before patrons who have lately suffered uncertainty about younger practitioners. Hanno folds his invitation along its crease. He is included as a courtesy to a former pupil."
    ] },
    { id: "a-public-demise", heading: "A Public Demise", pov: "hanno", mood: "ember", sfx: "/audio/sfx-ember.wav", text: [
      "There is too little room for the chairs. Hanno stands near a window overlooking a court where a servant washes lettuce. Through an open door comes the counting of plates. His old master has arranged the stolen material on blue velvet; beside it stands a shipping case with Hanno's destination mark partly scraped away.",
      "Sinna speaks about professional experience and the discipline distinguishing discovery from spectacle. Hanno knows where each pause will come. He has supplied the facts behind versions of this speech before.",
      "A patron asks whether the preparation has been tried. Sinna produces a page of observations from his preliminary examinations. Hanno recognizes the old sequence of checks. They establish appearance and consistency, not safety. Once, Sinna would have insisted on a longer period of observation; now he has advertised the result to clients who are already leaving him. The page shows where investigation stopped and the promise took over.",
      "A younger guest asks to be first. Hanno feels the danger he accepted take on a face. Sinna refuses: he would never ask anyone to risk what he would not risk himself. The sentence is designed for this room, for the pleasure of watching doubt dispelled. Hanno has relied on precisely that performance, but until the guest sits back he cannot draw an easy breath.",
      "Hanno could speak. He feels the possibility as clearly as the window frame beneath his fingers. He thinks of his mother's last entry. Sinna raises the cup.",
      "For a little while nothing happens. Questions resume. Then Sinna sets down the cup without finishing an answer. His knee strikes the display table. The room mistakes it for a stumble until he tries to draw breath.",
      "Hanno reaches him first. He kneels among spilled fragments and opens the tight fastening at his throat. Someone shouts for another healer. Sinna stares at him. Hanno cannot know whether the stare contains recognition, though afterward he will supply it again and again.",
      "He does the things the witnesses expect. They do not save Sinna. The servant from the courtyard stands in the doorway with wet hands, unable to put down the leaves.",
      "The inquiry finds the altered shipping mark. The merchant produces the disputed claim. A magistrate concludes that Sinna stole untested material and represented it as his own. The finding has enough truth to stand, and says nothing about the person who prepared it.",
      "It does not clear the Ravash remedy. Alethea continues submitting treatment records and bringing other practitioners to examine patients. That slower work restores confidence. Hanno lets people connect the two vindications because the confusion feels like justice.",
      "At the memorial Numarius touches his shoulder. \"A dangerous thing,\" he says, \"to know another man's habits so well.\" Hanno looks at him, but the First Seat is already greeting somebody else.",
      "On the way home Hanno pays a potter to fire five bowls. Asked whether he wants the thumb mark smoothed, he says no. He has avenged his mother, he tells himself, carrying the empty wrapping home. There ought to be some task after that, somewhere to put his hands. The workshop is open. People are waiting to be healed."
    ] }
  ]
};
