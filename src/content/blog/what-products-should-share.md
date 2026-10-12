---
title: "What products in a group should share, and what they should not"
description: Shared sign-in, billing and hosting save money. Shared code and teams slow products down. How a group decides what to share and what to keep separate.
date: 2026-10-12
tags: [strategy, products]
faq:
  - q: "Should every product in a group use the same platform?"
    a: "Only for the parts that are the same everywhere and that customers do not see as different, such as sign-in, payments, hosting and backups. The parts that make each product useful should stay with that product."
  - q: "When does sharing become a problem?"
    a: "When one product has to wait for another to change something it depends on. If a shared part is changed often by several products, it needs an owner and a clear contract, or it should not be shared."
  - q: "Who owns a shared part?"
    a: "One named team, with the products as its customers. A shared part with no owner becomes something everyone uses and nobody fixes."
---

A company with several products keeps finding the same work in each one. Every product needs sign-in. Every product takes payments. Every product needs servers, backups, monitoring and a way to send messages. Building these once looks like an easy saving.

Sometimes it is. Sometimes sharing ties products together so tightly that none of them can move without the others. The question is not whether to share, but what.

## Why sharing is tempting

The case for sharing is real:

- **Less work.** Building sign-in once instead of five times saves months.
- **Fewer mistakes.** Security, backups and payments are easy to get wrong. One careful version is better than five rushed ones.
- **Lower running cost.** One set of servers, one monitoring system and one on-call rota cost less than five.
- **One account for customers.** A customer who uses two products does not want two logins.

These savings grow with the number of products. For a small group, they can decide whether a new product is affordable at all.

## Why sharing goes wrong

The cost of sharing is less visible and arrives later:

- **Waiting.** When a product needs a change in a shared part, it waits for whoever owns it. If nobody owns it, it waits for everyone to agree.
- **Coupling.** A change made for one product breaks another. Teams start to avoid changing the shared part at all.
- **Lowest common denominator.** The shared part does what every product needs, and nothing that one product needs badly.
- **Unclear blame.** When something fails, each product points at the shared part, and the shared part points back.

None of this shows up in the first year. It shows up when the products start to grow in different directions.

## A simple test

For each candidate, ask four questions:

1. **Is it the same for every product?** Sign-in usually is. A booking screen usually is not.
2. **Do customers see it as different between products?** If not, sharing costs nothing in the experience.
3. **How often does it change?** Parts that change rarely are safe to share. Parts that change every week are not, unless one team owns them.
4. **What does failure cost?** If a bug costs money or trust, such as payments, backups or security, one careful version is worth the coordination.

If a part is the same everywhere, invisible to customers, slow to change and costly to get wrong, share it. If it is specific, visible, fast-moving or cheap to get wrong, leave it with the product.

## What usually belongs in the shared layer

- **Identity and sign-in.** One account, one set of security rules.
- **Payments and billing.** Taking money, invoices, refunds and records.
- **Hosting, backups and monitoring.** Servers, databases, restore tests and alerts.
- **Messaging.** Sending email, SMS and notifications.
- **Legal and policy basics.** Privacy notices, terms and data handling rules that must be the same everywhere.

These are the parts where a mistake in one product would be a mistake for the whole group anyway.

## What usually belongs to each product

- **The core workflow.** What the customer came to do.
- **The screens and the words.** Each product speaks to different people.
- **The data model for its own domain.** A camera event and a phone call are not the same thing.
- **Pricing.** Each market pays differently.
- **The roadmap.** Each product decides what to build next, within the budget the group sets. Our post on [choosing what to build next](/blog/choosing-what-to-build-next) covers how the group compares requests.

## Share contracts, not code

The safest way to share is through a clear contract: a documented interface that the shared part promises to keep stable. Products call it. They do not reach into it.

This lets the shared team change how things work inside without breaking products, and lets products build on top without waiting. Sharing a code library that every product copies and changes is the opposite: it looks shared, but each copy drifts.

## Give every shared part an owner

A shared part needs one named team that owns it, with the products as its customers. That team:

- Decides how the shared part changes.
- Publishes changes in advance.
- Keeps it running and answers when it fails.
- Says no when a request belongs in a product instead.

Without an owner, a shared part becomes something every product uses and nobody fixes. This is the most common way shared platforms fail.

## When to stop sharing

Sometimes a product grows so far from the others that the shared part holds it back. When a product keeps working around a shared part, or keeps asking for changes only it needs, it may be time for that product to have its own version. That is not a failure. The sharing did its job while the product was small.

Review the shared layer once a year with the same four questions. Some parts will move into it. A few will move out.

## How the group decides

Deciding what to share is a group decision, not one for any single product, because the cost and the benefit fall across all of them. Our post on [what the group should decide](/blog/what-the-group-should-decide) sets out where that line sits.

## A short checklist

- List the work every product repeats.
- Apply the four questions to each item.
- Share the parts that are the same, invisible, stable and costly to get wrong.
- Leave the core workflow, screens, data and roadmap with each product.
- Share through stable contracts, not copied code.
- Name an owner for every shared part.
- Review once a year, and let a product leave when it has outgrown the shared version.
