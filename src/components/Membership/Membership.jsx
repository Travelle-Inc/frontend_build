import React, { useState } from 'react';
import { Check, Star, Crown, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import './Membership.css';

const Membership = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const tiers = [
        {
            name: 'Traveler',
            subtitle: 'Free Tier',
            price: 'Free',
            period: '',
            color: '#ef4444',
            icon: Star,
            features: [
                'Create up to 3 trips',
                'Basic trip planning',
                'Flights, Hotels, Cars, Trains, Cruises',
                'Standard search support',
                'Trip export (PDF)',
                '1 free hotel night (up to $2,500 value)',
                'Basic booking access'
            ],
            limitations: [
                'No Travelle Coin rewards',
                'No Travelle Club rewards',
                'Limited priority support'
            ],
            cta: 'Get Started',
            highlighted: false
        },
        {
            name: 'Explorer',
            subtitle: 'Tier 1 - Most Popular',
            price: '$9.99',
            period: '/month or $99/year',
            color: '#3b82f6',
            icon: Sparkles,
            features: [
                'All Traveler features + Special member rates',
                'Create up to 10 trips',
                'All-new experiences',
                'Priority customer support',
                '1% Travelle Coin on every 1 night stay (up to $100)',
                '1 free hotel night (up to $2,500 value)',
                '5% Travelle Coin on travel spend (up to $1000)',
                'Check-Out ONLY',
                'VIP Airport Lounge (See Rates [1])',
                '$20 credit'
            ],
            limitations: [],
            cta: 'Join Now',
            highlighted: true
        },
        {
            name: 'Voyager',
            subtitle: 'Tier 2 - Premium',
            price: '$29.99',
            period: '/month or $299/year',
            color: '#8b5cf6',
            icon: Crown,
            features: [
                'All Voyager features + Luxury member rates',
                'Unlimited trips',
                'Yachts, Helicopters, private jets',
                'Priority phone & chat support',
                '3% Travelle Coin on every 1 night stay (up to $1000)',
                '1 free hotel night (up to $3,000 value)',
                '3% Travelle Coin on travel spend (up to $1000)',
                'Concierge Access & Arrival [1]',
                'Premier discounts (location-based prices)',
                '6 months 0% financing'
            ],
            limitations: [],
            cta: 'Join Now',
            highlighted: false
        },
        {
            name: 'Travelle Club',
            subtitle: 'Invitation Only',
            price: '$999',
            period: 'or more (call only)',
            color: '#eab308',
            icon: Crown,
            features: [
                'Invite-only, with your Travelle Club concierge',
                'Full white-glove access to Yachts, Helicopters, private jets',
                'Best pricing, upgrades & VIP treatment',
                'Dedicated Ambassador & trip planning',
                '5% Travelle Coin on travel spend (up to $1000)',
                '1 free hotel night (up to $700 value)',
                'Travelle Club Concierge & partner access',
                'Exclusive luxury events access',
                'Complimentary partner access (select luxury plans)',
                'Free trial upgrade (30d)',
                'Exclusive luxury events access',
                'Complimentary Travelle 2 partner access',
                'Exclusive luxury events access (special luxury plans)',
                '12-18 months 0%'
            ],
            limitations: [],
            cta: 'Notify Me',
            highlighted: false
        }
    ];

    const comparisonFeatures = [
        { name: 'Hotel Rewards', traveler: '1 free night / $2,500', explorer: '1 free night / $2,500', voyager: '1 free night / $3,000', club: '1 free night / $700' },
        { name: 'Air Speed Rewards', traveler: 'Free night / $2,500', explorer: 'Free night / $2,500', voyager: 'Free night / $3,000', club: 'Free night / 4 nights' },
        { name: 'Travelle Coin', traveler: '1%', explorer: '1%', voyager: '3%', club: '5% + bonus' },
        { name: 'Financing', traveler: 'None', explorer: '6 months 0%', voyager: '12 months 0%', club: '12-18 months 0%' },
        { name: 'Support', traveler: 'Standard', explorer: 'Priority', voyager: 'Priority Phone', club: 'Dedicated Ambassador' }
    ];

    const faqs = [
        {
            question: 'What is Travelle Coin?',
            answer: 'Travelle Coin is our rewards currency that you earn on eligible bookings. You can redeem Travelle Coins for discounts on future travel purchases, upgrades, and exclusive experiences.'
        },
        {
            question: 'How do hotel night rewards work?',
            answer: 'Each membership tier includes free hotel nights up to a specified value. These can be redeemed at participating hotels worldwide. The value varies by tier, with higher tiers offering more valuable free nights.'
        },
        {
            question: 'Can I upgrade or downgrade my membership?',
            answer: 'Yes! You can upgrade your membership at any time and start enjoying the benefits immediately. If you downgrade, the change will take effect at the end of your current billing cycle.'
        },
        {
            question: 'How do I get invited to Travelle Club?',
            answer: 'Travelle Club is our exclusive invitation-only tier. Members are selected based on their travel activity, engagement with our platform, and overall membership history. You can also request an invitation by contacting our concierge team.'
        }
    ];

    return (
        <div className="membership-container">
            <div className="membership-header">
                <h1>Select Membership Type</h1>
                <p>Choose the perfect plan for your travel needs</p>
            </div>

            {/* Pricing Cards */}
            <div className="pricing-cards">
                {tiers.map((tier, index) => {
                    const TierIcon = tier.icon;
                    return (
                        <div
                            key={index}
                            className={`pricing-card ${tier.highlighted ? 'highlighted' : ''}`}
                            style={{ '--tier-color': tier.color }}
                        >
                            <div className="card-header">
                                <TierIcon size={32} className="tier-icon" />
                                <h3>{tier.name}</h3>
                                <p className="tier-subtitle">{tier.subtitle}</p>
                            </div>

                            <div className="card-price">
                                <span className="price">{tier.price}</span>
                                {tier.period && <span className="period">{tier.period}</span>}
                            </div>

                            <ul className="features-list">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <Check size={16} className="check-icon" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {tier.limitations.length > 0 && (
                                <div className="limitations">
                                    <p className="limitations-title">Limitations:</p>
                                    <ul>
                                        {tier.limitations.map((limitation, idx) => (
                                            <li key={idx}>{limitation}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button className="cta-button" style={{ backgroundColor: tier.color }}>
                                {tier.cta}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* VIP Upfront Banner */}
            <div className="vip-banner">
                <h2>Become a VIP Upfront</h2>
                <p>Skip slow check-in/late check-out, preferred rates, upgrades, and more.</p>
                <button className="vip-cta-button">Join Travelle Club</button>
            </div>

            {/* Benefits Comparison Overview */}
            <div className="comparison-section">
                <h2>Benefits Comparison Overview</h2>
                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Benefit</th>
                                <th>
                                    <Star size={20} />
                                    <span>Traveler</span>
                                </th>
                                <th>
                                    <Sparkles size={20} />
                                    <span>Explorer</span>
                                </th>
                                <th>
                                    <Crown size={20} />
                                    <span>Voyager</span>
                                </th>
                                <th>
                                    <Crown size={20} />
                                    <span>Travelle Club</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonFeatures.map((feature, index) => (
                                <tr key={index}>
                                    <td className="feature-name">{feature.name}</td>
                                    <td>{feature.traveler}</td>
                                    <td>{feature.explorer}</td>
                                    <td>{feature.voyager}</td>
                                    <td className="club-cell">{feature.club}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                            <button className="faq-question" onClick={() => toggleFaq(index)}>
                                <span>{faq.question}</span>
                                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                            {openFaq === index && (
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Membership;

